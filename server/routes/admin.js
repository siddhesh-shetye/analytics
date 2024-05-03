module.exports = {
    type: 'admin',
    routes: [
        {
            method: 'GET',
            path: '/admin',
            handler: 'controller.index',
            config: {
                policies: [],
            },
        },
    ]
};
