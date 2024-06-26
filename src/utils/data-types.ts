export type BlockItem = {
    id: string,
    extraData: string,
    fee: number,
    gasLimit: string,
    gasUsed: number,
    hash: string,
    parentHash: string,
    number: number,
    size: number,
    miner: string,
    timestamp: string,
    account: string,
    validatorName: string,
    txsCount: number,
    viewNumber: number,
    createdAt: string,
    updatedAt: string
}

export type TransactionListItem = {
    isContract: number,
    number: number,
    method: string,
    contract: string,
    from: string,
    to: string,
    txHash: string,
    value: string,
    timestamp: number | string,
    status: number
}

export type HomeTransactionListItem = {
    symbol: string,
    method: string,
    contract: string,
    baseFeePerGas: string,
    error: string,
    type: number,
    nonce: number,
    isContract: number,
    input: string,
    number: number,
    gasUsed: number,
    gas: number,
    maxPriorityFeePerGas: string,
    from: string,
    id: string,
    to: string,
    maxFeePerGas: string,
    txHash: string,
    value: string,
    gasPrice: string,
    status: number,
    timestamp: string,
}

export type TransactionDetailObj = {
    method: string,
    methods?: {
        id: string,
        key: string,
        name: string,
        params: string,
        type: number
    } | null,
    blockHeight: number,
    transaction: TransactionListItem & {
        id: string,
        gasUsed: number,
        nonce: number,
        gasPrice: string,
        gas: number,
        input: string,
        maxFeePerGas: string,
        maxPriorityFeePerGas: string,
        type: number,
        error: string,
        baseFeePerGas: number,
        timestamp: string,
        createdAt: string,
        updatedAt: string
    } | null
}

export type TransactionLogItem = {
    contractEntity: null,
    logIndex: number,
    data: string,
    method: string,
    contract: string,
    methodName: string,
    createdAt: string,
    number: number,
    id: string,
    logs: string,
    txHash: string,
    methodsEntity: {
        id: string,
        key: string,
        name: string,
        params: string,
        type: number,
    } | null,
    updatedAt: string
}

export type TransactionTokenTransferItem = {
    contract: string,
    from: string,
    iconUrl: string,
    name: string,
    symbol: string,
    to: string,
    tokenURI: string,
    type: number,
    val: number,
}

export type ContractItem = {
    address: string,
    createdAt: string,
    decimal: string,
    iconUrl: string,
    id: string,
    isAttestation: number,
    marks: string,
    name: string,
    symbol: string,
    tag: string,
    tokenURI: string,
    totalSupply: string,
    type: number,
    updatedAt: string,
}

export type TransactionEventsData = {
    logslist: TransactionLogItem[],
    tokenTranList: TransactionTokenTransferItem[],
    methodList: [],
    contract: ContractItem | null,
}

export type InternalTransactionItem = {
    id: string,
    number: number,
    txHash: string,
    type: string,
    from: string,
    to: string,
    value: string,
    gas: string,
    gasUsed: string,
    input: string,
    output: string,
    time: string,
    timestamp: string,
}
export type BlockDetailObj = {
    blocks: {
        id: string,
        extraData: string,
        fee: string,
        gasLimit: string,
        gasUsed: string,
        hash: string,
        parentHash: string,
        number: string,
        size: string,
        miner: string,
        timestamp: string,
        account: string,
        validatorName: string,
        txsCount: number,
        viewNumber: number,
        createdAt: string,
        updatedAt: string
    },
    total: string
}

export type ChainItem = {
    id: number,
    chainId: number,
    chainName: string,
    scanUrl: string,
    chainImg: string,
    mosContract: string
}

export type CrossChainListItem = {
    id: number,
    address: string,
    state: number,
    sourceHash?: string,
    relayerHash?: string,
    toHash: string,
    sourceChain: ChainItem,
    relayerChain?: ChainItem,
    toChain?: ChainItem,
    timestamp: string | null
}

export type LightClientItem = {
    id: number,
    name: string,
    chain: string,
    chainId: string,
    chainImg: string,
    lightAddress: string,
    startHeight: number,
    toChainId: string,
    txHash: string,
    height: string,
    fromAddress: string,
    timestamp: string
}


export type CrossChainDetailData = {
    bridgeInfo: {
        sourceAddress: string,
        sourceHash: string,
        sourceHeight: number,
        relayerOutHeight?: number,
        relayerOutHash?: string,
        destinationHash?: string,
        destinationHeight?: number,
        sourceInput: string,
        relayerOutInput?: string,
        destinationInput?: string,
        state: number,
        relayerLightNode?: LightClientItem,
        toLightNode?: LightClientItem,
        sourceNowHeight: number,
        relayerNowHeight?: number,
        toNowHeight?: number,
        relayerVerifyState?: number,
        destinationVerifyState?: number,
        timestamp: string,
        sourceMOSContract: string | null,
        relayerMOSContract: string | null,
        destinationMOSContract: string | null,
        relayerMessengerContract: string,
        destinationMessengerContract: string,
        sourceChainDict: ChainItem,
        relayerChainDict?: ChainItem,
        destinationChainDict?: ChainItem
    }
}

export type LightClientItemObj = {
    id: number,
    name: string,
    chain: string,
    chainId: string,
    chainImg: string,
    lightAddress: string,
    startHeight: number,
    toChainId: string,
    txHash: string,
    height: string,
    fromAddress: string,
    timestamp: string
}

export type LightClientListItem = {
    mapLightNode: LightClientItemObj,
    toLightNode: LightClientItemObj,
}

export type LightClientDetail = {
    lightClient: LightClientItemObj,
    nowHeight: number
}



export type ValidatorListItem = {
    voteReward: string,
    signAddress: string,
    lockedAmount: string,
    accountAddress: string,
    activeAmount: string,
    votePercent: number,
    version: number,
    url: string,
    createdAt: string,
    upTime: string,
    rewardAddress: string,
    pk2: string,
    blockNumber: number,
    pk1: string,
    name: string,
    id: string,
    votedAmount: string,
    isValidator: number,
    logo?: string,
}

export type TokenListItem = {
    symbol: string,
    address: string,
    create_from: string,
    tokenURI: string,
    totalSupply: string,
    marks: string,
    type: number,
    isAttestation: number,
    createdAt: number,
    holderCount: number,
    name: string,
    id: string,
    tag: string,
    transactionCount: number,
    decimal: number,
    create_hash: string,
    tokenBalance: string,
    contract: string,
    iconUrl?: string,
}

export type TokenTransferListItem = {
    symbol: string,
    contract: string,
    type: number,
    createdAt: string,
    name: string,
    from: string,
    id: string,
    to: string,
    iconUrl: string,
    decimal: number,
    txHash: string,
    value: string,
    timestamp: string,
}

export type NFTTransferListItem = {
    symbol: string,
    logIndex: number,
    tokenId: string,
    contract: string,
    createdAt: string,
    name: string,
    from: string,
    id: string,
    to: string,
    iconUrl: string,
    txHash: string,
    value: string,
    timestamp: string,
}

export type TokenTransactionListItem = {
    id: string,
    txHash: string,
    contract: string,
    from: string,
    to: string,
    value: string,
    timestamp: string,
}

export type TokenInfoData = {
    tokenInfo?: {
        id: string,
        address: string,
        marks: string,
        decimal: number,
        totalSupply: string,
        create_from: string,
        create_hash: string,
        createAt: string,
        symbol: string,
        name: string,
        tag: string,
        type: number,
        isAttestation: number,
        iconUrl: string,
        tokenURI: string,
        createdAt: string,
    },
    holders: number,
    transactionCount: number
}

export type TokenHolderItem = {
    account: string,
    balance: string,
    percentage: number
}

export type HomepageVolumeChartData = {
    volume: number,
    chainName: string,
    color: string,
    sourceChainId: number,
    chainImg: string
}

export type HomepageTransactionNumberData = {
    allCount: number,
    nativeCount: number,
    crossCount: number,
}

export type HomeAccountChartDataModel = {
    name: string,
    size: number,
    value: number,

}

export type HomepageChartsData = {
    crossDay30Account: any
    day30AllVolume: string
    day1AllVolume: string
    day7AllVolume: string
    allVolume: string
    assetCharData: {
        [key: string]: number
    },
    volumeCharData: HomepageVolumeChartData[],
    volumeCharDataDay30: HomepageVolumeChartData[],
    volumeCharDataDay7: HomepageVolumeChartData[],
    volumeCharDataDay1: HomepageVolumeChartData[],
    allTransactionCount: HomepageTransactionNumberData,
    crossChainTransactions: {
        [key: string]: number,
    },
    day1CrossChainTransactions: {
        [key: string]: number,
    },
    day7CrossChainTransactions: {
        [key: string]: number,
    },
    day30CrossChainTransactions: {
        [key: string]: number,
    },
    day1TransactionCount: HomepageTransactionNumberData,
    day7TransactionCount: HomepageTransactionNumberData,
    day30TransactionCount: HomepageTransactionNumberData,
    transactionCharData: {
        [key: string]: number,
    },
    allTransactionCharData: {
        [key: string]: number,
    },
    nativeTransactionCharData: {
        [key: string]: number,
    },
    crossChainTransactionCharData: {
        [key: string]: number,
    },
    allAccount: number,
    day1Account: number,
    day7Account: number,
    day30Account: number,
    accountCharData: {
        [key: string]: number,
    },
    contractCharData: {
        [key: string]: number,
    },
    allContractCharData: {
        [key: string]: number,
    },
    nativeContractCharData: {
        [key: string]: number,
    },
    crossContractCharData: {
        [key: string]: number,
    },

    contractCount: string,
    accountDay1DataArr: HomeAccountChartDataModel[],
    accountDay7DataArr: HomeAccountChartDataModel[],
    accountDay30DataArr: HomeAccountChartDataModel[],
    accountAllDataArr: HomeAccountChartDataModel[],
    allContractCount: HomepageTransactionNumberData,
    day1ContractCount: HomepageTransactionNumberData,
    day7ContractCount: HomepageTransactionNumberData,
    day30ContractCount: HomepageTransactionNumberData,

}

export type HomePageData = {
    tokenTvlList?: any
    allTvl?: string,
    blocksList: BlockItem[],
    transactionList: HomeTransactionListItem[],
    totalBlocks: number,
    blockTime: string,
    epoch: number,
    validators: number,
    totalVotes: string,
    stakingApy: string,
    transactionCount: string,
    connectedCount: string,
    assetCount: string,
    contractCount: string,
    bridgeTransactionList: CrossChainListItem[],
    transactionCharData: { [key: string]: any },
    connectedCharData: { [key: string]: any },
    assetCharData: { [key: string]: any },
    contractCharData: { [key: string]: any },
    volumeCharData: HomeVolumeChartChainItem[]
}

export type AllValidatorData = {
    epoch: number,
    selectedCount: number,
    count: number,
    totalVotes: number
}

export type ValidatorChartsData = {
    totalVotesCharData: { [key: string]: string },
    validatorCharData: { [key: string]: number },
    stakingApy: number
}

export type ValidatorSummaryListItem = {
    id: string,
    validator: string,
    account: string,
    allVotes: number,
    allVotesStr: string,
    pendingVotes: number,
    pendingVotesStr: string,
    activeVotes: number,
    activeVotesStr: string,
}

export type ChartsData = {
    labels: string[],
    values: number[]
}

// accounts
export type AccountBasicData = {
    isContract: number,
    balance: string,
    tokenTotal: number,
    erc20Total: number,
    erc721Total: number,
    nftTotal: number,
    contract?: {
        address
        :
        string
        create_from
        :
        string
        create_hash
        :
        string
        createdAt
        :
        string
        decimal
        :
        number
        iconUrl
        :
        string
        id
        :
        string
        isAttestation
        :
        number
        marks
        :
        string
        name
        :
        string
        symbol
        :
        string
        tag
        :
        string
        tokenURI
        :
        string
        totalSupply
        :
        string
        type
        :
        1
        updatedAt
        :
        string
    }

}

export type InternalTransactionListItem = {
    id: string,
    number: number,
    txHash: string,
    type: string,
    from: string,
    to: string,
    value: string,
    gas: string,
    gasUsed: string,
    input: string,
    output: string,
    timestamp: string,
}

// validator
export type ValidatorBasicInfo = {
    committeeBasicInfo: {
        voteReward: number,
        signAddress: string,
        lockedAmount: string,
        accountAddress: string,
        activeAmount: string,
        votePercent: number,
        version: number,
        url: number,
        createdAt: string,
        upTime: string,
        rewardAddress: string,
        pk2: string,
        blockNumber: number,
        pk1: string,
        name: string,
        id: string,
        votedAmount: string,
        isValidator: number,
        validatorInfo?: {
            discord: string,
            id: string,
            info: string,
            logo: string,
            telegram: string,
            twitter: string,
            website: string,
        }
    }
}

export type ValidatorRewardListItem = {
    id: string,
    number: number,
    epoch: string,
    address: string,
    reward: number,
    rewardStr: string,
    voterReward: number,
    voterRewardStr: string,
    commssion: string
}

export type ValidatorDelegationSummaryListItem = {
    id: string,
    validator: string,
    account: string,
    allVotes: number,
    allVotesStr: string,
    pendingVotes: number,
    pendingVotesStr: string,
    activeVotes: number,
    activeVotesStr: string,
}

export type ValidatorDetailResponseData = {
    commssionPercentage: string,
    startEpoch: number,
    totalLockedAmount: string,
    lastEpochCommssion: string,
    lastEpochVoterReward: string,
    rewardList: ValidatorRewardListItem[],
    delegationList: [],
    delegationSummary: ValidatorDelegationSummaryListItem[],
    upTime: string,
    rewardCharMap: {
        [key: string]: string
    },
    votesCharMap: {
        [key: string]: number
    }
}

export type ValidatorVoteListItem = {
    id: string,
    number: number,
    validator: string,
    account: string,
    value: number,
    version: number,
    type: number,
    createdAt: string,
}

export type VoterRewardListItem = {
    id: string,
    version: number,
    validator: string,
    voter: string,
    reward: number,
}

export type VoterVotesListItem = {
    id: string,
    number: number,
    validator: string,
    account: string,
    value: number,
    version: number,
    type: number,
}

export type PocTransactionListItem = {
    id: string,
    method: string,
    eventMethod: string,
    number: number,
    contract: string,
    txHash: string,
    from: string,
    to: string,
    value: string,
    input: string,
    status: number,
    timestamp: string,
}

export type CrossChainChainInfo = {
    id: number,
    chainId: number,
    chainName: string,
    scanUrl: string,
    chainImg: string,
    mosContract: string
}

export type CrossChianTransferData = {
    info: {
        fromChain: CrossChainChainInfo,
        relayerChain: CrossChainChainInfo,
        toChain: CrossChainChainInfo,
        tokenAddress: string,
        tokenSymbol: string,
        timestamp: string,
        completeTime: string,
        amount: number,
        inAmount: number,
        fee: number,
        state: number,
        sourceHash: string,
        relayerHash: string,
        toHash: string,
        sourceAddress: string,
        toAddress: string,
        fromTokenDecimal: number,
        sourceToken: string,
        destinationToken: string
    }
}

export type HomeVolumeChartChainItem = {
    volume: number,
    chainName: string,
    sourceChainId: number,
    chainImg: string,
    color: string,
}

export type BridgeTransactionListItem = {
    address: string,
    chainId: string,
    height: number,
    id: number,
    input: string,
    lightAddress: string,
    timestamp: string,
    txHash: string,
}

export type NFTItemObj = {
    owner: string,
    image: string,
    tokenId: string,
    tokenUri: string,
    contract: string,
    description: string,
    castingHash: string,
    castingTime: string,
    createdAt: string,
    name: string,
    contractSymbol: string,
    attributes: string,
    contractName: string,
    id: string,
    updatedAt: string
}

export type NFTDetailObj = {
    owner: string,
    image: string,
    tokenId: string,
    tokenUri: string,
    contract: string,
    creator?: string | null,
    description: string | null,
    castingHash: string,
    castingTime: string,
    name: string | null,
    contractSymbol: string,
    attributes: string, // json string
    contractName: string,
    id: string,
}
