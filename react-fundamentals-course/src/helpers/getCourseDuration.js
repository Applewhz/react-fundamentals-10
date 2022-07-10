export const displayDurationInHoursAndMinutes = (durationInMinutes) => {
    let convertedDuration = '';
    let outputHours = '';
    let outputMinutes = '';
    const hours = Math.floor(durationInMinutes/60);
    const minutes = durationInMinutes % 60;
    if(hours < 10){
        outputHours = `0${hours}` ;
    } else {
        outputHours = `${hours}`;
    }
    if(minutes < 10){
        outputMinutes = `0${minutes}`
    } else {
        outputMinutes = `${minutes}`
    }
    convertedDuration = `${outputHours}:${outputMinutes}`;
    return convertedDuration;
}
