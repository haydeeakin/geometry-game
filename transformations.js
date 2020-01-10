// coordinate at 0 is x and 1 is y
export function translation(coordinate, move, direction){
    if(direction === 'x'){
        coordinate[0] += move;
        return coordinate;
    }
    if(direction === 'y'){
        coordinate[1] += move;
        return coordinate;
    }
}
export function rotation(coordinate, angle, center = [0,0]){
    let newX = (coordinate[0] - center[0])*Math.cos(angle*Math.PI/180) - (coordinate[1] - center[1])*Math.sin(angle*Math.PI/180) + center[0];
    let newY = (coordinate[0] - center[0])*Math.sin(angle*Math.PI/180) + (coordinate[1] - center[1])*Math.cos(angle*Math.PI/180) + center[1];
    coordinate[0] = newX;
    coordinate[1] = newY;
    return coordinate;
}
//for reflection about line in standard form where 0 = Ax + By + C  ||   A,B and C are passed in an array as [A,B,C]
export function reflection(coordinate, line){
    let newX = ((Math.pow(line[1],2) - Math.pow(line[0],2))*coordinate[0] - 2*line[0]*line[1]*coordinate[1] - 2*line[0]*line[2])/(Math.pow(line[0],2) + Math.pow(line[1],2))

    let newY = ((Math.pow(line[0],2) - Math.pow(line[1],2))*coordinate[1] - 2*line[0]*line[1]*coordinate[0] - 2*line[1]*line[2])/(Math.pow(line[0],2) + Math.pow(line[1],2))

    coordinate[0] = newX;
    coordinate[1] = newY;
    return coordinate;
}