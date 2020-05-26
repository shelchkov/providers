import React from 'react';
import Provider from '../Provider/Provider';
import { providersList } from '../../utils/providers-list';

export const ProvidersList = ({ selectProvider }) => (
	<div>
		{providersList.map(item =>
			<Provider key={item.id} provider={item} 
				selectProvider={selectProvider} />
		)}
	</div>
)
