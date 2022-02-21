const Sequelize = require('sequelize')
const connection = require('./database')

let Pergunta = connection.define('perguntas', {
    titulo:{
        type: Sequelize.STRING,
        allowNull: false
    },
    descricao: {
        type: Sequelize.TEXT,
        allowNull: false
    }
});

Pergunta.sync({force:false});

module.exports = Pergunta;