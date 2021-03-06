import { NavigationInjectedProps } from 'react-navigation';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

import { loadSeries } from '../../actions';
import List from '../../components/list';
import { getSeries, getSeriesPagination } from '../../reducers/selectors';
import { AppState } from '../../store';

interface Item {
	[key: string]: any;
}

const mapStateToProps = (state: AppState, props: NavigationInjectedProps) => ({
	items: getSeries(state),
	pagination: getSeriesPagination(state),
	avatarExtractor: (item: Item) => item.logoImage.url,
	subtitleExtractor: () => '',
	onPress: (item: Item) =>
		props.navigation.navigate({
			routeName: 'Serie',
			params: {
				url: item.id,
				title: item.title,
				description: item.description,
				image: item.logoImage256 && item.logoImage256.url,
			},
		}),
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
	actions: bindActionCreators(
		{
			loadData: loadSeries,
		},
		dispatch
	),
});

export default connect(mapStateToProps, mapDispatchToProps)(List);
