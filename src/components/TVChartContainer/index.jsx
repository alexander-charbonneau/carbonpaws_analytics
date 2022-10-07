import * as React from 'react';
import './index.css';
import { widget } from '../../charting_library';
import api from '../tvapi/index'

export class TVChartContainer extends React.PureComponent {
	
	static defaultProps = {
		symbol: 'EWD/EWT',
		interval: 'H',
		libraryPath: '../charting_library/',
		chartsStorageUrl: 'https://saveload.tradingview.com',
		chartsStorageApiVersion: '1.1',
		clientId: 'tradingview.com',
		userId: 'public_user_id',
		fullscreen: false,
		autosize: true,
	};

	tvWidget = null;

	constructor(props) {
		super(props);

		this.ref = React.createRef();
	}

	componentDidUpdate(prevProps) {
		if(this.props.updateProp === 0){
		} else if (this.props.updateProp !== prevProps.updateProp) {
		const widgetOptions = {
			symbol: this.props.symbol,
			// BEWARE: no trailing slash is expected in feed URL
			datafeed: api(this.props.address,this.props.bars),
			interval: this.props.interval,
			container: this.ref.current,
			library_path: this.props.libraryPath,
			theme: "dark",
			locale: 'en',
			disabled_features: ['use_localstorage_for_settings'],
			enabled_features: ['study_templates'],
			charts_storage_url: this.props.chartsStorageUrl,
			charts_storage_api_version: this.props.chartsStorageApiVersion,
			client_id: this.props.clientId,
			user_id: this.props.userId,
			fullscreen: this.props.fullscreen,
			autosize: this.props.autosize,
			studies_overrides: this.props.studiesOverrides,
		};

		const tvWidget = new widget(widgetOptions);
		this.tvWidget = tvWidget;

		tvWidget.onChartReady(() => {
			tvWidget.headerReady().then(() => {
				const button = tvWidget.createButton();
				button.setAttribute('title', 'Click to show a notification popup');
				button.classList.add('apply-common-tooltip');
				button.addEventListener('click', () => tvWidget.showNoticeDialog({
					title: 'Notification',
					body: 'TradingView Charting Library API works correctly',
					callback: () => {
						console.log('Noticed!');
					},
				}));

				button.innerHTML = 'Check API';
			});
		});
	}
	}

	render() {
		return (
			<div
				ref={ this.ref }
				className={ 'TVChartContainer' }
			/>
		);
	}
}
