import React from 'react';
import './Provider.css';

function Provider({provider, selectProvider}) {
	return (
		<div className="provider ma3 br3 pa3 ml-auto mr-auto pointer bg-white overflow-hidden flex flex-column justify-center overflow-hidden" 
			title={provider.name} onClick={() => selectProvider(provider)}>
			<div className="">
				<img src={provider.logo} className="provider-logo" 
					alt="{provider.name}" />
			</div>
			<p className="">{provider.name}</p>
		</div>
	);
}

export default Provider;