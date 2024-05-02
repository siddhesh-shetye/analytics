module.exports = {
    type: 'admin',
    routes: [
        {
            method: 'GET',
            path: '/',
            handler: 'controller.index',
            config: {
                policies: [],
            },
        },
    ]
};