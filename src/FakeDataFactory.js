export default function GenerateFakeData(n) {

  const base = {
    "time":     1609462082,
    "temp":     55.5711,
    "pressure": -0.000259401,
    "distance": 5.12738,
    "swe":      0
  }

  let data = [base]

  for (let i = 1; i < n; i++) {

    let newData = Object.assign({}, data[i-1])

    newData.time     += 60 * 30 // 30 minutes
    newData.temp     += Math.sin(i)
    newData.pressure += Math.sin(i)
    newData.distance += Math.sin(i)
    newData.swe      += Math.sin(i)

    data.push(newData);
  }

  for (let i = 0; i < n; i++) {
    data[i].time = new Date(data[i].time * 1000)
  }

  return data
}
