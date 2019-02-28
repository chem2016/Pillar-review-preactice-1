const express = require('express')
const app = express()
const { Employee, Company } = require('./db')
const path = require('path');

// app.use(express.json())
// app.use('app-react.js', (req, res, next)=>
//     res.sendFile(path.join(__dirname, 'dist', 'main.js'))
// )
// app.use('/',(req, res, next)=>res.sendFile(path.join(__dirname, 'index.html')))

app.get('/',(req, res, next)=>{
    res.send('Hello')
    next()
})

app.get('/api/users',(req, res, next)=>{
    Employee.findAll()
        .then((employees)=>{
            res.send(employees)
        })
        .catch(next)
})

// does not work with instance method
// app.get('/users/:id',(req, res, next)=>{
//     Employee.findById(req.params.id)
//         .then((employee)=>{
//             //const sumValue = employee.sumFavNum()
//             return employee.sumFavNum()
//         })
//         .then((sumValue)=>{ res.send(sumValue)})
//         .catch(next)
    
// })

app.post('/api/users/:id',(req, res, next)=>{
    Employee.createUser()
    .then(emplyee => res.send(emplyee))
    .catch(next)
})

app.delete('/api/users/:id',(req, res, next)=>{
    Employee.destroy({
        where: {
            id: req.params.id,
        }
    })
    .then(()=>res.sendStatus(204))
    .catch(next)
})


app.use((err, req, res, next)=>{
    res.status(err.status || 500).send(err)
})


module.exports = {app};