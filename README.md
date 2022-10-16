# LOA Labs Node Monitor

Nodejs toolset to monitor validator uptime and diskspace, automate rewards and restaking, monitor and vote on governance proposals. 

Takes a lightweight approach to node monitoring and automation. Nodejs instance can run on its own 

Single instance can monitor multiple chains and connect to multiple notification channels such as Slack, Discord, Telegram, and Twitter.

Leverages authz to delegate a sub-set of needed authorizations to perform automated tasks. 

Each service runs on its own cron schedule, frequency of checkins and notifications can be customized.