const url = 'https://ttp.cbp.dhs.gov/schedulerapi/locations/?temporary=false&inviteOnly=false&operational=true&serviceName=Global+Entry'

export default function fetchData() {
    fetch(url)
        .then((e)=>{
            e?.json()
        }).then((data)=>{
            console.log(data)
        }).catch((err)=>{
            console.log(err)
        })
}