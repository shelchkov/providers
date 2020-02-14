import React from 'react';
import Provider from '../Provider/Provider';
import providers from '../../providersList';

export const ProvidersList = ({ selectProvider }) => (
	<div>
		{providers.map(item =>
			<Provider key={item.id} provider={item} 
				selectProvider={selectProvider} />
		)}
	</div>
)
