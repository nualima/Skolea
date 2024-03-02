'use strict';
module.exports = {
    up: async(queryInterface, Sequelize) => {
        await queryInterface.createTable('ProfessorSubjects', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            professorId: {
                type: Sequelize.INTEGER,
                references: { model: 'Professors', key: 'id' },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',
            },
            subjectId: {
                type: Sequelize.INTEGER,
                references: { model: 'Subjects', key: 'id' },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
            }
        });
    },
    down: async(queryInterface, Sequelize) => {
        await queryInterface.dropTable('ProfessorSubjects');
    }
};