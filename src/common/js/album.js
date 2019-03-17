export default class Album{
  constructor({id,mid,name,date,singer}){
    this.id=id
    this.mid=mid
    this.name=name
    this.singer=singer
    this.date=date
    this.avatar=`https://y.gtimg.cn/music/photo_new/T002R300x300M000${this.mid}.jpg?max_age=2592000`
  }
}
