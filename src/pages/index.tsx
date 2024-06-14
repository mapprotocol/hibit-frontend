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
    bg: 'https://s3-alpha-sig.figma.com/img/43c4/729a/65f4f5f35b1230692b0197ecc5621595?Expires=1719187200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=qmgnhhq-kRghcXv2HYloxKf8DNkUbifdttJPp2jn2L9-7aM53RBws3qvjiKwNN-y65mQAWwiSnCyoIuWXnhR0Vxbee5P4EyZo0ObfnH~sUuieZgs4O8qnSwA6cueJIU~RFyX0mtCI~8Dcf69SUM3WkRy6MD8DzUTRAgbt9nmnMx8t03z6bSz2wTIlBZYcuGw0wKZ3ZYYWm5cthUIbeYbsTTNy9xrHpesk5HguMmS5cMRuDoJbxvedGK3gjXPBeZQOjQ3b0B0yL-STyodW9EarDczDC~sWp7MzxtejHEWGfthCZzm-aKv1pTi8ipMfL5CunY36FKehQTcvbYr-esuiA__',
    name: 'BOME',
    change: '2.8%',
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
        className={styles.messageImage}
        src={`/icons/moon.svg`}
        alt="moon" />To da moon</>,

  }, {
    content: <>  <img
      className={styles.coin}

      height={24}
      width={24}
      src={`https://s3-alpha-sig.figma.com/img/2a5a/72d0/22a2e0d21fab55de9af04226ec36c557?Expires=1718582400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=T77SWhCIj9i-aV5lap4Q2OO6voD3m~5F66f~aOWkfZk1UsIoq-d8P7mT004MiS0KOoUWM5Dtb-X0yE8aKUmIqqYWanssI4OfQ0SKyQ-kkxTK7lX8YvRALg0nNpD8iRXz~T5Ghry2o8PpxiPLbr6HDN4cGsRXZNbN4djScfEvnQyLjVgoZSx6ZjbOxwQIIa-BBo~4lQxDAkPzgti4Ck8MEFVeLNar388NVK64ETZfcvYYgOF7EMjf6XaidGaB5XlgfXGaeSJfmYUNXCfDXVKdK6G9pvJh1BVhb7~ysv2QiMxKhB1db2VKFlFex8rSWzONrjw8ylgG8-N6RYLRXQODJw__`}
      alt="doge" />
      <Image
        height={40}
      className={styles.messageImage}

        width={40}
        src={`/icons/message1.svg`}
        alt="moon" />LFG</>,

  },
  {
    content: <>  <img
      className={styles.coin}
      height={24}
      width={24}
      src={`https://s3-alpha-sig.figma.com/img/2a5a/72d0/22a2e0d21fab55de9af04226ec36c557?Expires=1718582400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=T77SWhCIj9i-aV5lap4Q2OO6voD3m~5F66f~aOWkfZk1UsIoq-d8P7mT004MiS0KOoUWM5Dtb-X0yE8aKUmIqqYWanssI4OfQ0SKyQ-kkxTK7lX8YvRALg0nNpD8iRXz~T5Ghry2o8PpxiPLbr6HDN4cGsRXZNbN4djScfEvnQyLjVgoZSx6ZjbOxwQIIa-BBo~4lQxDAkPzgti4Ck8MEFVeLNar388NVK64ETZfcvYYgOF7EMjf6XaidGaB5XlgfXGaeSJfmYUNXCfDXVKdK6G9pvJh1BVhb7~ysv2QiMxKhB1db2VKFlFex8rSWzONrjw8ylgG8-N6RYLRXQODJw__`}
      alt="doge" />
      <Image
        height={40}
        width={40}
        className={styles.messageImage}
        src={`/icons/message2.svg`}
        alt="moon" /><div className={styles.colorText}>Pump! Pump!</div></>,

  },
  {
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
        className={styles.messageImage}
        alt="moon" />Next 1000x</>,

  },
  {
    content: <>  <img
      className={styles.coin}
      height={24}
      width={24}
      src={`https://s3-alpha-sig.figma.com/img/2a5a/72d0/22a2e0d21fab55de9af04226ec36c557?Expires=1718582400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=T77SWhCIj9i-aV5lap4Q2OO6voD3m~5F66f~aOWkfZk1UsIoq-d8P7mT004MiS0KOoUWM5Dtb-X0yE8aKUmIqqYWanssI4OfQ0SKyQ-kkxTK7lX8YvRALg0nNpD8iRXz~T5Ghry2o8PpxiPLbr6HDN4cGsRXZNbN4djScfEvnQyLjVgoZSx6ZjbOxwQIIa-BBo~4lQxDAkPzgti4Ck8MEFVeLNar388NVK64ETZfcvYYgOF7EMjf6XaidGaB5XlgfXGaeSJfmYUNXCfDXVKdK6G9pvJh1BVhb7~ysv2QiMxKhB1db2VKFlFex8rSWzONrjw8ylgG8-N6RYLRXQODJw__`}
      alt="doge" />
      <Image
        height={40}
        width={40}
        src={`/icons/message2.svg`}
        className={styles.messageImage}
        alt="moon" /><div className={styles.colorText}>Pump! Pump!</div></>,

  },
  {
    content: <>  <img
      className={styles.coin}

      height={24}
      width={24}
      src={`https://s3-alpha-sig.figma.com/img/2a5a/72d0/22a2e0d21fab55de9af04226ec36c557?Expires=1718582400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=T77SWhCIj9i-aV5lap4Q2OO6voD3m~5F66f~aOWkfZk1UsIoq-d8P7mT004MiS0KOoUWM5Dtb-X0yE8aKUmIqqYWanssI4OfQ0SKyQ-kkxTK7lX8YvRALg0nNpD8iRXz~T5Ghry2o8PpxiPLbr6HDN4cGsRXZNbN4djScfEvnQyLjVgoZSx6ZjbOxwQIIa-BBo~4lQxDAkPzgti4Ck8MEFVeLNar388NVK64ETZfcvYYgOF7EMjf6XaidGaB5XlgfXGaeSJfmYUNXCfDXVKdK6G9pvJh1BVhb7~ysv2QiMxKhB1db2VKFlFex8rSWzONrjw8ylgG8-N6RYLRXQODJw__`}
      alt="doge" />
      <Image
        height={40}
        width={40}
        src={`/icons/message1.svg`}
        className={styles.messageImage}
        alt="moon" />LFG</>,

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
        className={styles.messageImage}
        alt="moon" />To da moon</>,

  }, {
    content: <>  <Image
      height={24}
      width={24}
      src={`/icons/doge.svg`}
      alt="doge" />No.1 Meme</>,

  },
  {
    content: <>  <img
      className={styles.coin}
      height={24}
      width={24}
      src={`https://s3-alpha-sig.figma.com/img/8448/cffc/d6562547b1b51aac348d2f9b1bb6e31f?Expires=1719187200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=KQb87RJ-OONrC2ldrAUspmYJx005Bd0yFw~nWXvy9TZlEEqMXGYYJ6aif~P798zDGZrOYQ05IUVFZJIHjdkSnDqS53~fY1fZhEoNL9PhV-8MkuoVEB0Ma4HOkR8qEoYeVLJPBUYaSdCeAo8I5QAzv4tkWi6GOlTh5JDGSXufGxUrrKZ1Lqzy9XtN3CDAIHwJJb0Xu02mBUV4lucogS4aLDLILsSuPbQBC32xbdvHl7MGfl89A-PNr5HYVA35weXnEnV3tZppfUtM1wZzjiiWM5y6GaEpGaUSIrd8Do7TS20~NYGCu-~IOBwIM7fagay7SuqvDshqM94TzonVaIvyWw__`}
      alt="doge" />
      <Image
        height={40}
        width={40}
        src={`/icons/message3.svg`}
        className={styles.messageImage}
        alt="moon" /><div className={styles.colorText}>Rocket high</div></>,

  },
  {
    content: <>  <img
      className={styles.coin}
      height={24}
      width={24}
      src={`https://s3-alpha-sig.figma.com/img/d299/0674/461778852b067d53dfbef06684b53acc?Expires=1719187200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=fjhGbuWy1A6WqSz8sAGTXQP~-WOIJwmT84tDkje3vAPFY5mDOHYJbntrWMdP~FCG6J5LS7kPjmDaVEvtFR-S4qYkVfpako4eHLeD0QQ6JBbJ8vuw8JCkQ1yNkSWnswBvR3JqlrvacLrpX286-UEFSgBYUJjQmSkZadblR8dC7W679~j91AMaGKOdFBDsbVM9tcTMV7AgjamBfXiY-GHDVZd5ukh5i0mI~Xj1Dpvgk-dP11SUv0A1H-bbzwT6396On8fG6Xy8ThMym0SJQn-RmqQ~OcdhLtlyzcH6YRAbURGSpHJNfBZBo4vN4c0llySI~n4SJ3rbftDYVS0ikiqb5g__`}
      alt="doge" />
      <Image
        height={40}
        width={40}
        className={styles.messageImage}
        src={`/icons/message4.svg`}
        alt="moon" />ETF</>,

  },
  {
    content: <>  <img
      className={styles.coin}
      height={24}
      width={24}
      src={`https://s3-alpha-sig.figma.com/img/0074/b231/1e7702afa54132a33ca4bd39397f4ac8?Expires=1718582400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=ijWPmXSD7V4SwEETFrZL7nECfN1X6rtukHO6x6Ug~LhYh1ckbHqkn1bkQosCTleeoLEZMuWGXKVRbox0aJ2D6HuxrPHFl-uaNQUkJrUjNI5NMxxkv0PkZPHM2dY4s-L3gDjEA7IVsxpZONh9mocjzQ4Br~nFKmrfIWgiL-Vv~x9t9w3d67AsHnPhqwcM0xdqhSyT4q7gH5GiO6v9tco-av-HND56Np4aBIIlbBh408e5X7ZHNupfyJO63Vopjv5NB7e3Qk3qaUCkHEcpEvQZ~7ROjJ8dg5uhKcYdpER8jQPxKIrzNLV8ghjif0vTdjlDdr8Q6iyNi3CbGpQjXlJ9-w__`}
      alt="doge" />
      <Image
        height={40}
        width={40}
        src={`/icons/message5.svg`}
        className={styles.messageImage}
        alt="moon" /><div className={styles.sellColorText}>Dump everything</div></>,

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
            {/* <Image
              height={32}
              width={32}
              src={`/icons/discord.svg`}
              alt="discord" />
            <Image
              height={32}
              width={32}
              src={`/icons/telegram.svg`}
              alt="telegram" /> */}
            <Image
              height={32}
              width={32}
              onClick={() => {
                router.push('https://x.com/Bibobibo_fun')
              }}
              src={`/icons/x.svg`}
              alt="x" />
          </div>
          <div className={styles.start}

          // onClick={() => {
          //   router.push('/app')
          // }}
          >
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
              <div className={styles.coming}>{"Coming Soon"}</div>
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
              hotCoins.concat(hotCoins).map(item =>
                <div key={item.bg} className={styles.hotCoinItem}>
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
            {/* <Image
              height={32}
              width={32}
              src={`/icons/discord.svg`}
              alt="discord" />
            <Image
              height={32}
              width={32}
              src={`/icons/telegram.svg`}
              alt="telegram" /> */}
            <Image
              height={32}
              width={32}
              onClick={() => {
                router.push('https://x.com/Bibobibo_fun')
              }}
              src={`/icons/x.svg`}
              alt="x" />
          </div>
        </div>
      </div>
    </div>
  );
}
