
function ritaSong() {
  
  
  class Song {
    constructor({id, mid, singer, singermid, name, album, duration, image, url}) {
      this.id = id
      this.mid = mid
      this.singer = singer
      this.singermid = singermid
      this.name = name
      this.album = album
      this.duration = duration
      this.image = image
      this.filename = ''
      this.url = url
    }
  }
  
  function createSong(musicData) {
    return new Song({
      id: musicData.id,
      mid: musicData.mid,
      singer: musicData.singer,
      singermid: musicData.singer,
      name: musicData.name,
      album: musicData.album,
      duration: musicData.duration,
      image: '',
      url: musicData.url
      
    })
  }
  
  const rita = [
    {
      album: '唱給我爱的阿笑宝宝',
      duration: 0,
      filename: '',
      id: 1,
      image: '',
      mid: 1,
      name: '最佳损友',
      singer: '袁企鹅(宝宝)',
      singermid: '0',
      url: ''
    }, {
      album: '唱給我爱的阿笑宝宝',
      duration: 0,
      filename: '',
      id: 1,
      image: '',
      mid: 1,
      name: '6666',
      singer: '袁企鹅(宝宝)',
      singermid: '0',
      url: ''
    }, {
      album: '唱給我爱的阿笑宝宝',
      duration: 0,
      filename: '',
      id: 1,
      image: '',
      mid: 1,
      name: '7777',
      singer: '袁企鹅(宝宝)',
      singermid: '0',
      url: ''
    }, {
      album: '唱給我爱的阿笑宝宝',
      duration: 0,
      filename: '',
      id: 1,
      image: '',
      mid: 1,
      name: '888',
      singer: '袁企鹅(宝宝)',
      singermid: '0',
      url: ''
    }
  ]
  
  function normalizeSong(list) {
    let ret = []
    list.forEach((musicData) => {
      if (musicData.id && musicData.mid) {
        ret.push(createSong(musicData))
      }
    })
    return ret
  }
  
  const ritaSong = normalizeSong(rita)
  console.log(ritaSong)
  
  return ritaSong
}

export const ritaSongs=ritaSong()
