export const todoStatus = (keys) => {
    let status = {};
    keys.forEach(key => {
        if (status[key.date]) { 
            if (key.status) {
                status[key.date].isDone = true; 
            }
            if (!key.status) {
                status[key.date].isNotDone = true; 
            }
        } else {
            status[key.date] = {};
            if (key.status) {
                status[key.date].isDone = true; 
            }
            if (!key.status) {
                status[key.date].isNotDone = true; 
            }
        }
    });
    return status;
}