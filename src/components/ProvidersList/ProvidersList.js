import React from 'react';
import Provider from '../Provider/Provider';
import providers from '../../providersList';

function ProvidersList({selectProvider}) {

	const providersList = providers.map((item, i) => {
		return (
			<Provider key={i} provider={item} selectProvider={selectProvider}/>
		);
	});

	return (
		<div>
			{providersList}
		</div>
	);
}

export default ProvidersList;