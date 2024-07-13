import moment from 'moment';

export async function sleep(ms: number) {
    return await new Promise((resolve) => {
        setTimeout(() => {
            resolve(true);
        }, ms);
    })
}

export function timeSince(timestamp:string) {
    const now =  moment().unix();
    const old = moment(timestamp).unix()
    const timeDiff = (now - old) * 1000
    console.log(`now`,now,old,timeDiff)

    const seconds = Math.floor(timeDiff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) {
        return `${days}d before`;
    } else if (hours > 0) {
        return `${hours}h before`;
    } else if (minutes > 0) {
        return `${minutes}m before`;
    } else if (seconds > 0) {
        return `${seconds}s before`;
    } else {
        return "Recently";
    }
}
