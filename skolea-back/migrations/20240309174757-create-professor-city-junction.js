module.exports = {
    up: async(queryInterface, Sequelize) => {
        await queryInterface.createTable('ProfessorCities', {
            professorId: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'Professors',
                    key: 'id'
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE'
            },
            cityId: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'Cities',
                    key: 'id'
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE'
            }
        });
    },
    down: async(queryInterface, Sequelize) => {
        await queryInterface.dropTable('ProfessorCities');
    }
};