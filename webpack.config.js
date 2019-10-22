import darkTheme from '@ant-design/dark-theme';

module.exports = {
    module: {
        rules: [
            {
                test: /\.less$/,
                loader: 'less-loader', // compiles Less to CSS
                options: {
                    modifyVars: darkTheme,
                },
            },
        ],
    },
};
