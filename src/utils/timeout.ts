export async function sleep(ms: number) {
    return await new Promise((resolve) => {
        setTimeout(() => {
            resolve(true);
        }, ms);
    })
}

