module.exports = function check(str, bracketsConfig) {
    if (str.length % 2 !== 0) return false;
    let queue = [];
    let errors = [];
    let currentOpen;
    str.split('').forEach(bracket => {
        for (let index = 0; index < bracketsConfig.length; index++) {
            const config = bracketsConfig[index];
            const irreg = currentOpen == bracket && config[0] == config[1] ? false : true;
            if (config[0] == bracket && irreg) {
                //if open
                currentOpen = bracket;
                currentClose = config[1];
                queue.push(bracket);
                break;
            }
            if (config[1] == bracket) {
                //if close
                if (currentOpen == config[0]) {
                    queue.pop();
                    currentOpen = queue[queue.length - 1];
                } else {
                    errors.push(bracket);
                    currentOpen = '';
                }
                break;
            }
        }
    });
    return (queue.length == 0 && errors.length == 0) ? true : false;
}