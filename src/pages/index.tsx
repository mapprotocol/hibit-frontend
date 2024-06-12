import Image from "next/image";
import styles from './index.module.css'
import { Router, useRouter } from "next/router";

const bannerList = [
  {
    bg: '/images/banner1.png'
  },
  {
    bg: '/images/banner2.png'
  },
  {
    bg: '/images/banner3.png'
  },
  {
    bg: '/images/banner4.png'
  }
]

const hotCoins = [
  {
    bg: '/images/coin1.png',
    name: 'BOBO',
    change: '28.8%'
  }, {
    bg: '/images/coin1.png',
    name: 'BOBO',
    change: '28.8%'
  }, {
    bg: '/images/coin1.png',
    name: 'BOBO',
    change: '28.8%'
  }, {
    bg: '/images/coin1.png',
    name: 'BOBO',
    change: '28.8%'
  }, {
    bg: '/images/coin1.png',
    name: 'BOBO',
    change: '28.8%'
  }, {
    bg: '/images/coin1.png',
    name: 'BOBO',
    change: '28.8%'
  }, {
    bg: '/images/coin1.png',
    name: 'BOBO',
    change: '28.8%'
  }, {
    bg: '/images/coin1.png',
    name: 'BOBO',
    change: '28.8%'
  }, {
    bg: '/images/coin1.png',
    name: 'BOBO',
    change: '28.8%'
  }, {
    bg: '/images/coin1.png',
    name: 'BOBO',
    change: '28.8%'
  }, {
    bg: '/images/coin1.png',
    name: 'BOBO',
    change: '28.8%'
  }, {
    bg: '/images/coin1.png',
    name: 'BOBO',
    change: '28.8%'
  },
]

const topCoins = [
 
  {
    bg: 'https://s3-alpha-sig.figma.com/img/2a5a/72d0/22a2e0d21fab55de9af04226ec36c557?Expires=1718582400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=T77SWhCIj9i-aV5lap4Q2OO6voD3m~5F66f~aOWkfZk1UsIoq-d8P7mT004MiS0KOoUWM5Dtb-X0yE8aKUmIqqYWanssI4OfQ0SKyQ-kkxTK7lX8YvRALg0nNpD8iRXz~T5Ghry2o8PpxiPLbr6HDN4cGsRXZNbN4djScfEvnQyLjVgoZSx6ZjbOxwQIIa-BBo~4lQxDAkPzgti4Ck8MEFVeLNar388NVK64ETZfcvYYgOF7EMjf6XaidGaB5XlgfXGaeSJfmYUNXCfDXVKdK6G9pvJh1BVhb7~ysv2QiMxKhB1db2VKFlFex8rSWzONrjw8ylgG8-N6RYLRXQODJw__',
    name: 'BRETT',
    change: '3,210%',
    time: 'Apr 12'
  },
  {
    bg: 'https://s3-alpha-sig.figma.com/img/d299/0674/461778852b067d53dfbef06684b53acc?Expires=1718582400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=cRJRb6gk~1P7wFQgUAF~4aaZYLP8Phc0b1oQmOr~BCjtlAqbLyHQhJRobLa~urqhtVqqMNmVOlxwkURFtb7j-QQjM75mSdm8njo9KCLzvdZwIF5Ck5HI4J~h-Q6nByy5fVc8zmW0~hESs1xh48fasn6wgjYAGH7apTnWCab8R4wYn0H6~6cuZaKrej4-EdD9aESmVR~i33jD--0or2gLlHa9IBKE-uD~nsTTFvsMK4xkIQQ9ry6peLMfzlJ88o6dHSKxd6WsAQkuaZLtikd5dwAssAR8uwv~HkUVASXw8uQX5L2~DjE6rFPtpbp16dPm~zL0Q2RaIH-5CLuWYOTW0Q__',
    name: 'PEACH',
    change: '332%',
    time: 'Apr 12'
  },
  {
    bg: 'https://s3-alpha-sig.figma.com/img/0074/b231/1e7702afa54132a33ca4bd39397f4ac8?Expires=1718582400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=ijWPmXSD7V4SwEETFrZL7nECfN1X6rtukHO6x6Ug~LhYh1ckbHqkn1bkQosCTleeoLEZMuWGXKVRbox0aJ2D6HuxrPHFl-uaNQUkJrUjNI5NMxxkv0PkZPHM2dY4s-L3gDjEA7IVsxpZONh9mocjzQ4Br~nFKmrfIWgiL-Vv~x9t9w3d67AsHnPhqwcM0xdqhSyT4q7gH5GiO6v9tco-av-HND56Np4aBIIlbBh408e5X7ZHNupfyJO63Vopjv5NB7e3Qk3qaUCkHEcpEvQZ~7ROjJ8dg5uhKcYdpER8jQPxKIrzNLV8ghjif0vTdjlDdr8Q6iyNi3CbGpQjXlJ9-w__',
    name: 'FET',
    change: '28.8%',
    time: 'Apr 12'
  },
  {
    bg: 'https://s3-alpha-sig.figma.com/img/2a5a/72d0/22a2e0d21fab55de9af04226ec36c557?Expires=1718582400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=T77SWhCIj9i-aV5lap4Q2OO6voD3m~5F66f~aOWkfZk1UsIoq-d8P7mT004MiS0KOoUWM5Dtb-X0yE8aKUmIqqYWanssI4OfQ0SKyQ-kkxTK7lX8YvRALg0nNpD8iRXz~T5Ghry2o8PpxiPLbr6HDN4cGsRXZNbN4djScfEvnQyLjVgoZSx6ZjbOxwQIIa-BBo~4lQxDAkPzgti4Ck8MEFVeLNar388NVK64ETZfcvYYgOF7EMjf6XaidGaB5XlgfXGaeSJfmYUNXCfDXVKdK6G9pvJh1BVhb7~ysv2QiMxKhB1db2VKFlFex8rSWzONrjw8ylgG8-N6RYLRXQODJw__',
    name: 'BRETT',
    change: '28.8%',
    time: 'Apr 12'
  },
  {
    bg: 'https://s3-alpha-sig.figma.com/img/addc/f5c4/059e8704f85efe5c2e6bee578cc222ce?Expires=1718582400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=HHnHnlxx5WF-cTLepZKKKmTG5xjouyOeMSEknTJOaT34wGQTP5AOslPO5OYFFNc74WOeACn6Uf2LNd8IjasGLv2VEIDmqxx3JjYWWFAVyF1ZfR7rKXDnipDxIRYTCGsS6~iYL3h~1RUF0HMlkPPzX1L-LEhlT-0ZwIZuwn3Ej33FQ20HzJCRspoX3ejhDfG-2g8GQOaRnlM9kDztSYFVeJMFkRiDoaGwwXZ2MfARff6iJi9DIlb7qX4U8kSboUeozpJ9~JN6yjfMDSCR-fru9OYXjrrI3JtRp-eWpfo8PSipby596ddcBFZ6d~y2Y7ZU8T8FUtUhzNwvmihrxXERmg__',
    name: 'DEGEN',
    change: '28.8%',
    time: 'Apr 12'
  },
  {
    bg: '/images/coin2.png',
    name: 'PEPE',
    change: '28.8%',
    time: 'Apr 12'
  },
]

const messages = [
  {
    content: <>  <Image
      height={24}
      width={24}
      src={`/icons/doge.svg`}
      alt="doge" />No.1 MemeNo.1 Meme</>,

  },
  {
    content: <>  <Image
      height={24}
      width={24}
      src={`/icons/hat.svg`}
      alt="hat" />
      <Image
      height={40}
      width={40}
      src={`/icons/moon.svg`}
      alt="moon" />To da moon</>,

  },{
    content: <>  <Image
      height={24}
      width={24}
      src={`/icons/doge.svg`}
      alt="doge" />No.1 Meme</>,

  },
  {
    content: <>  <Image
      height={24}
      width={24}
      src={`/icons/hat.svg`}
      alt="hat" />
      <Image
      height={40}
      width={40}
      src={`/icons/moon.svg`}
      alt="moon" />To da moon</>,

  },{
    content: <>  <Image
      height={24}
      width={24}
      src={`/icons/doge.svg`}
      alt="doge" />No.1 Meme</>,

  },
  {
    content: <>  <Image
      height={24}
      width={24}
      src={`/icons/hat.svg`}
      alt="hat" />
      <Image
      height={40}
      width={40}
      src={`/icons/moon.svg`}
      alt="moon" />To da moon</>,

  },{
    content: <>  <Image
      height={24}
      width={24}
      src={`/icons/doge.svg`}
      alt="doge" />No.1 Meme</>,

  },
  {
    content: <>  <Image
      height={24}
      width={24}
      src={`/icons/hat.svg`}
      alt="hat" />
      <Image
      height={40}
      width={40}
      src={`/icons/moon.svg`}
      alt="moon" />To da moon</>,

  },{
    content: <>  <Image
      height={24}
      width={24}
      src={`/icons/doge.svg`}
      alt="doge" />No.1 Meme</>,

  },
  {
    content: <>  <Image
      height={24}
      width={24}
      src={`/icons/hat.svg`}
      alt="hat" />
      <Image
      height={40}
      width={40}
      src={`/icons/moon.svg`}
      alt="moon" />To da moon</>,

  },{
    content: <>  <Image
      height={24}
      width={24}
      src={`/icons/doge.svg`}
      alt="doge" />No.1 Meme</>,

  },
  {
    content: <>  <Image
      height={24}
      width={24}
      src={`/icons/hat.svg`}
      alt="hat" />
      <Image
      height={40}
      width={40}
      src={`/icons/moon.svg`}
      alt="moon" />To da moon</>,

  }, {
    content: <>  <Image
      height={24}
      width={24}
      src={`/icons/doge.svg`}
      alt="doge" />No.1 Meme</>,

  }
]
export default function Home() {

  const router = useRouter()
  return (
    <div className={styles.home}>
      <div style={{
        width: '100%', height: 'auto', position: 'absolute',
        top: 0, left: 0, zIndex: 0,
      }}>
        <Image
          layout="responsive"
          width={1920}
          height={1080}
          style={{ objectFit: "contain" }}
          src={`/images/banner-background-pc.png`}
          alt="map"
        />
      </div>
      <div className={styles.header}>
        <Image
          height={52}
          width={110}
          src={`/icons/logo.svg`}
          alt="logo" />
        <div className={styles.headerRight}>
          <div className={styles.icons}>
            <Image
              height={32}
              width={32}
              src={`/icons/discord.svg`}
              alt="discord" />
            <Image
              height={32}
              width={32}
              src={`/icons/telegram.svg`}
              alt="telegram" />
            <Image
              height={32}
              width={32}
              src={`/icons/x.svg`}
              alt="x" />
          </div>
          <div className={styles.start} onClick={()=>{
            router.push('/app')
          }}>
            <Image
              height={40}
              width={215}
              src={`/images/btn-start-trading.png`}
              alt="x" />
          </div>
        </div>
      </div>

      <div className={styles.offerings}>
        <div className={styles.title}>
          {'New Offerings'}
        </div>
        <div className={styles.banners}>
          {bannerList.map((item) =>
            <div key={item.bg} className={styles.bannerItem}>
              <Image
                style={{ objectFit: "contain" }}
                src={item.bg}
                fill
                alt="banner" />
            </div>)}

        </div>
      </div>


      <div className={styles.keywords}>
        <div className={styles.title}>
          <Image
            style={{ objectFit: "contain" }}
            src={`/icons/keywords.svg`}
            height={28}
            width={28}
            alt="keywords" />
          {"Keywords Today"}</div>

        <div className={styles.messages}>

          {messages.map((item, index) => <div key={index} className={styles.messageItem}>
            {item.content}
          </div>)}
          {messages.map((item, index) => <div key={index} className={styles.messageItem}>
            {item.content}
          </div>)}
        </div>
        <div></div>

      </div>
      <div className={styles.list}>
        <div className={styles.hotCoins}>
          <div className={styles.title}>
            <Image
              style={{ objectFit: "contain" }}
              src={`/icons/hotcoins.svg`}
              height={28}
              width={28}
              alt="hotcoins" />{"Hot Coins"}</div>
          <div className={styles.hotCoinsList}>
            {
              hotCoins.map(item =>
                <div key={item.bg} className={styles.hotCoinItem}>
                  <div className={styles.coinAvatar}>
                    <Image
                      style={{ objectFit: "contain" }}
                      src={item.bg}
                      fill
                      alt="avatar" /></div>
                  <div className={styles.hotCoinName}>{item.name}</div>
                  <div className={styles.changeLeft}>
                    <Image
                      style={{ objectFit: "contain" }}
                      src={`/icons/arrow-up.svg`}
                      height={10}
                      width={10}
                      alt="arrow" />{item.change}
                  </div>

                </div>

              )
            }
          </div>
        </div>
        <div className={styles.topGainers}>
          <div className={styles.title}>
            <Image
              style={{ objectFit: "contain" }}
              src={`/icons/topgainers.svg`}
              height={28}
              width={28}
              alt="topgainers" />{"Top Gainers"}</div>
          <div className={styles.topGainersList}>
            {
              topCoins.map(item =>
                <div key={item.bg} className={styles.topGainersItem}>
                  <div className={styles.topGainersItemLeft}>
                    <div className={styles.coinAvatar}>
                      <img
                        style={{ objectFit: "contain" }}
                        src={item.bg}
                        alt="avatar" /></div>
                    <div className={styles.hotCoinName}>{item.name}</div>
                    <div className={styles.changeLeft}>
                      <Image
                        style={{ objectFit: "contain" }}
                        src={`/icons/arrow-up.svg`}
                        height={10}
                        width={10}
                        alt="arrow" />{item.change}
                    </div>
                  </div>
                  <div className={styles.topGainersItemTime}>{'Apr 12'}</div>
                </div>
              )
            }
          </div>

        </div>

      </div>
      <div className={styles.bottomLine}></div>
      <div className={styles.bottom}>
        <div className={styles.bottomLeft}>
          <Image
            height={48}
            width={102}
            src={`/icons/logo-bottom.svg`}
            alt="logo" />
          <div className={styles.bottomTab}>{"Terms of Use"}</div>
          <div className={styles.bottomTab}>{"Privacy Policy"}</div>

          <div className={styles.bottomTab}>{"Disclaimer"}</div>

          <div className={styles.bottomTab}>{"Contact Us"}</div>

        </div>
        <div className={styles.bottomRight}>
          <div className={styles.icons}>
            <Image
              height={32}
              width={32}
              src={`/icons/discord.svg`}
              alt="discord" />
            <Image
              height={32}
              width={32}
              src={`/icons/telegram.svg`}
              alt="telegram" />
            <Image
              height={32}
              width={32}
              src={`/icons/x.svg`}
              alt="x" />
          </div>
        </div>
      </div>
    </div>
  );
}
