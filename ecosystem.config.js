module.exports = {
    apps: [
        {
            name: 'BridgeAPI_v1',
            script: 'DIST/index.js',
            instances: 1,
            exec_mode: 'cluster',
            autorestart: true,
            watch: false,
            max_memory_restart: '1G',
            log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
            node_args: ['--max-old-space-size=4096', '--inspect'],
            args: ['--max-old-space-size=4096', '--inspect'],
            env: {
                NODE_ENV: 'production',
            },
            env_file: '.env',
            combine_logs: true,
            time: true,
            // log_type: 'json',
            out_file: './logs/SERVER.log',
            err_file: './logs/SERVER.log',
            // log: './logs/SERVER.log',
            log_rotate: true,
            log_size: '10M', // Rotate the logs when they reach 10 megabytes
            log_file: './logs/SERVER.log',
            log_backups: 5
        },
    ]
}