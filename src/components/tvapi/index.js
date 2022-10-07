import { client } from '../../apollo/client'
import { TOKEN_DATA } from '../../apollo/queries'

const configurationData = {
  supported_resolutions: ['1'],
}

export default (baseCurrency, pricedaytas) => ({
  onReady: (callback) => {
    setTimeout(() => callback(configurationData))
  },

  resolveSymbol: async (symbolName, onSymbolResolvedCallback, onResolveErrorCallback) => {
    let result = await client.query({
      query: TOKEN_DATA(baseCurrency),
      fetchPolicy: 'cache-first',
    })
    var data = result?.data?.tokens?.[0]

    if (!data) {
      onResolveErrorCallback()
    } else {
      const symbol = {
        ticker: data.symbol,
        name: `${data.symbol}/DAI`,
        description: 'EnergyWeb Doge',
        session: '24x7',
        timezone: 'Etc/UTC',
        type: 'crypto',
        format: 'price',
        minmov: 1,
        pricescale: 100000000,
        has_intraday: true,
        intraday_multipliers: ['1'],
        has_empty_bars: false,
        has_weekly_and_monthly: false,
        supported_resolutions: configurationData.supported_resolutions,
        volume_precision: 1,
        data_status: 'streaming',
        exchange: 'carbonpaws',
        listed_exchange: 'carbonpaws',
      }
      onSymbolResolvedCallback(symbol)
    }
  },

  getBars: async (symbolInfo, resolution, periodParams, onHistoryCallback, onErrorCallback) => {
    try {
      var updated
      resolution = '1'
      periodParams = {
        from: pricedaytas[0].time,
        to: pricedaytas[pricedaytas.length - 1].time,
      }
      if (pricedaytas && !updated) {
        let goof = pricedaytas
        updated = 0
        onHistoryCallback(goof, { noData: false })
      } else {
        console.log('No price data')
      }
    } catch (err) {
      console.log(err)
    }
  },
})
