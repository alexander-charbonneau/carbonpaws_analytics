export const FACTORY_ADDRESS = '0x17854c8d5a41d5A89B275386E24B2F38FD0AfbDd'

export const BUNDLE_ID = '1'

export const timeframeOptions = {
  WEEK: '1 week',
  MONTH: '1 month',
  THREE_MONTHS: '3 months',
  YEAR: '1 year',
  HALF_YEAR: '6 months',
  ALL_TIME: 'All time',
}

// token list urls to fetch tokens from - use for warnings on tokens and pairs
export const SUPPORTED_LIST_URLS__NO_ENS = [
  'https://nft.ewd.green/trusted.json',
  //  'https://www.coingecko.com/tokens_list/CarbonPaws/defi_100/v_0_0_0.json',
]

// hide from overview list
export const TOKEN_BLACKLIST = []

// pair blacklist
export const PAIR_BLACKLIST = []

// warnings to display if page contains info about blocked token
export const BLOCKED_WARNINGS = {
  '0xf4eda77f0b455a12f3eb44f8653835f377e36b76':
    'TikTok Inc. has asserted this token is violating its trademarks and therefore is not available.',
}

/**
 * For tokens that cause erros on fee calculations
 */
export const FEE_WARNING_TOKENS = []

export const UNTRACKED_COPY = 'Derived USD values may be inaccurate without liquid stablecoin or ETH pairings.'

// pairs that should be tracked but arent due to lag in subgraph
export const TRACKED_OVERRIDES_PAIRS = []

// tokens that should be tracked but arent due to lag in subgraph
// all pairs that include token will be tracked
export const TRACKED_OVERRIDES_TOKENS = [
  '0x6b3bd0478df0ec4984b168db0e12a539cc0c83cd',
  '0x9cd9caecdc816c3e7123a4f130a91a684d01f4dc',
  '0x26e4991a72728b1a9b1044345e5bf9293e0a1434',
]
