# adsl
通过两台adsl拨号机实现动态ip。
## 基本原理
轮流使用两台机器的ip，当A机器拨号时使用B机器的ip，当A机器拨号完成后，再通知B机器进行拨号。
## 使用方法
1. git clone https://github.com/gyr66/adsl 。
2. ```npm install```。
3. 修改setting.js中配置。
4. 在redis中手动添加当前两台机器的ip地址。
5. ```node server.js```
6. 在B机器上执行curl A机器ip地址:3000/dial启动。