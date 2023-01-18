import moment from "moment";

export const monthSetter = (startMonth) => {
    const today = moment();
    const todayTemp = moment();
    if (startMonth.length === 1){
        for (let i = 0; i < today.daysInMonth(); i++){
            startMonth.push(todayTemp.add(1, 'day').format('YYYY-MM-DD'));
        }
    }
}