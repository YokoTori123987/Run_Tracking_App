export const addlogandlap = async (event, client) => {
  // const uesrId = event.uesrId
  // const checkPoint = event.checkPoint
  // const timeStamp = event.timeStamp

  client.query(`SELECT "user"."currenthwid", "user"."currentRouteId",
  "routeCheckPoint"."before", "routeCheckPoint"."isFinish",
  "path"."pathDistance", "path"."pathName",
  "park"."parkName",
  "run"."runId", "run"."totalDistance",
  FROM 'user' , 'routeCheckPoint' , 'path' , 'park' , 'run'
  WHERE
  `)
}
