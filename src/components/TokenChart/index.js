/* eslint-disable */

import React, { useState, useRef, useEffect } from 'react'
import styled from 'styled-components'
import { Area, XAxis, YAxis, ResponsiveContainer, Tooltip, AreaChart, BarChart, Bar } from 'recharts'
import { AutoRow, RowBetween, RowFixed } from '../Row'

import { toK, toNiceDate, toNiceDateYear, formattedNum, getTimeframe } from '../../utils'
import { OptionButton } from '../ButtonStyled'
import { darken } from 'polished'
import { useMedia, usePrevious } from 'react-use'
import { timeframeOptions } from '../../constants'
import { useTokenChartData, useTokenPriceData } from '../../contexts/TokenData'
import DropdownSelect from '../DropdownSelect'
import CandleStickChart from '../CandleChart'
import LocalLoader from '../LocalLoader'
import { AutoColumn } from '../Column'
import { Activity } from 'react-feather'
import { useDarkModeManager } from '../../contexts/LocalStorage'
import { TVChartContainer } from '../TVChartContainer/index'

const ChartWrapper = styled.div`
  height: 100%;
  min-height: 300px;

  @media screen and (max-width: 600px) {
    min-height: 200px;
  }
`

const PriceOption = styled(OptionButton)`
  border-radius: 2px;
`

const CHART_VIEW = {
  VOLUME: 'Volume',
  LIQUIDITY: 'Liquidity',
  PRICE: 'Price',
  LINE_PRICE: 'Price (Line)',
}

const DATA_FREQUENCY = {
  DAY: 'DAY',
  HOUR: 'HOUR',
  LINE: 'LINE',
}

const TokenChart = ({ address, color, base }) => {
  // settings for the window and candle width
  const [chartFilter, setChartFilter] = useState(CHART_VIEW.PRICE)
  const [frequency, setFrequency] = useState(DATA_FREQUENCY.HOUR)

  const [darkMode] = useDarkModeManager()
  const textColor = darkMode ? 'white' : 'black'

  // reset view on new address
  const addressPrev = usePrevious(address)
  useEffect(() => {
    if (address !== addressPrev && addressPrev) {
      setChartFilter(CHART_VIEW.LIQUIDITY)
    }
  }, [address, addressPrev])

  let chartData = useTokenChartData(address)

  const [timeWindow, setTimeWindow] = useState(timeframeOptions.WEEK)
  const prevWindow = usePrevious(timeWindow)

  // hourly and daily price data based on the current time window
  const hourlyWeek = useTokenPriceData(address, timeframeOptions.WEEK, 3600)
  const hourlyMonth = useTokenPriceData(address, timeframeOptions.MONTH, 3600)
  const hourlyAll = useTokenPriceData(address, timeframeOptions.ALL_TIME, 3600)
  const dailyWeek = useTokenPriceData(address, timeframeOptions.WEEK, 86400)
  const dailyMonth = useTokenPriceData(address, timeframeOptions.MONTH, 86400)
  const dailyAll = useTokenPriceData(address, timeframeOptions.ALL_TIME, 86400)

  var bars = []
  var updateProp = 0

  if (updateProp === 0) {
    const priceData =
      timeWindow === timeframeOptions.MONTH
        ? // monthly selected
          frequency === DATA_FREQUENCY.DAY
          ? dailyMonth
          : hourlyMonth
        : // weekly selected
        timeWindow === timeframeOptions.WEEK
        ? frequency === DATA_FREQUENCY.DAY
          ? dailyWeek
          : hourlyWeek
        : // all time selected
        frequency === DATA_FREQUENCY.DAY
        ? dailyAll
        : hourlyAll

    if (!priceData) {
    } else {
      const epochStartUtc = (bars = priceData.map((el) => ({
        time: parseInt(el.timestamp) * 1000, // - utcStartTime,
        open: Number(el.open),
        close: Number(el.close),
        high: Number(el.high),
        low: Number(el.low),
      })))
      updateProp += 1
    }
  }

  // switch to hourly data when switched to week window
  useEffect(() => {
    if (timeWindow === timeframeOptions.WEEK && prevWindow && prevWindow !== timeframeOptions.WEEK) {
      setFrequency(DATA_FREQUENCY.HOUR)
    }
  }, [prevWindow, timeWindow])

  // switch to daily data if switche to month or all time view
  useEffect(() => {
    if (timeWindow === timeframeOptions.MONTH && prevWindow && prevWindow !== timeframeOptions.MONTH) {
      setFrequency(DATA_FREQUENCY.DAY)
    }
    if (timeWindow === timeframeOptions.ALL_TIME && prevWindow && prevWindow !== timeframeOptions.ALL_TIME) {
      setFrequency(DATA_FREQUENCY.DAY)
    }
  }, [prevWindow, timeWindow])

  const below1080 = useMedia('(max-width: 1080px)')
  const below600 = useMedia('(max-width: 600px)')

  let utcStartTime = getTimeframe(timeWindow)
  const domain = [(dataMin) => (dataMin > utcStartTime ? dataMin : utcStartTime), 'dataMax']
  const aspect = below1080 ? 60 / 32 : below600 ? 60 / 42 : 60 / 22

  return (
    <div className={'App'}>
      <TVChartContainer address={address} bars={bars} updateProp={updateProp} />
    </div>
  )
}

export default TokenChart
