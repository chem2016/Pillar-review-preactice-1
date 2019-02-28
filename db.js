const Sequelize = require('sequelize')
// conn is the model
const conn = new Sequelize(process.env.DATABASE_URL,{
    logging: false
})
// set up model to table
// name, and favoriteNum is column
const Employee = conn.define('employee',{
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    favoriteNum: {
        type: Sequelize.ARRAY(Sequelize.INTEGER),
        defaultValue: [7]
    },
    salary: {
        type: Sequelize.INTEGER,
        
    }
})

Employee.beforeCreate((employeeInstance, optionObject)=>{
    if(!employeeInstance.salary){
        employeeInstance.salary = 50000
    }
})

const Company = conn.define('company',{
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    Bio: Sequelize.TEXT,
    Years: {
        type: Sequelize.INTEGER,
        validate: {
            min: 1,
            max: 100,
        }
    }
})

Company.prototype.sumFavNum = function(id){
    // return this.favoriteNum.reduce((acc,current)=>{
    //     acc += current
    //     return acc;
    // },0)
    Employee.findById(id)
        .then(employee=>{
            return (employee.favoriteNum)
        })
}

Company.hasMany(Employee)
// Employee.belongsTo(Company, {foreignKey: 'companyId'})
Employee.belongsTo(Company)

const employees = [
    {name: 'moe', favoriteNum: [7,8,9], salary: 100000, companyId: 1},   
    {name: 'curly', favoriteNum: [10,11,12], salary: 105000, companyId: 1},
    {name: 'larry', favoriteNum: [13,14,15], salary: 200000},
];

Employee.createUser = function(){
    this.create({
        name: 'foo',
        favoriteNum: [4,5,6],
        salary: 60000,
    })
}

Employee.prototype.updateUser = function(){
    Employee.findByPk(1)
        .then(employee=>{employee.update({companyId: 1})})
}

const syncAndSeed = () => {
    return conn.sync({force: true})
        .then(async()=>{
            try{
                await Promise.all([
                    Company.create({name: 'Acme1', Bio: 'Acme User', Years: 5}),
                    Company.create({name: 'Acme2', Bio: 'Acme Web', Years: 10}),
                ])
                const [moe, curly, larry] = await Promise.all(employees.map((employee)=>{
                    return Employee.create(employee)
                }))
                

                
                //moe.updateUser()


            }
            catch(err){console.log(err)}
            
        }) 
}

module.exports = {
    syncAndSeed,
    Company,
    Employee,

}



// const [moe, curly, larry] = await Promise.all([
            //     Employee.create({name: 'moe', favoriteNum: [1,2], salary: 50000}), // cannot put companyId here?????
            //     Employee.create({name: 'curly', favoriteNum: [1,3], salary: 100000}),
            //     Employee.create({name: 'larry', favoriteNum: [1,4], salary: 80000}),
            // ])