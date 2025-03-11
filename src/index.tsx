import * as React from "react";
import {
	registerWidget,
	registerLink,
	registerUI,
	IContextProvider,
	enableLocalization,
	registerCustomWidgetTemplate,
} from "./uxp";
import { TitleBar, FilterPanel, WidgetWrapper } from "uxp/components";
import { IWDDesignModeProps } from "widget-designer/components";
import BundleConfig from "../bundle.json";

import "./styles.scss";
import OccupancyWidget from "./components/OccupancyWidget";
import TenantSentimentWidget from "./components/TenantSentiments";
import FilterComponent from "./components/Common/FilterComponent";
import EnergyEfficiency from "./components/EnergyEfficiency";
import MaintenanceCompliance from "./components/MaintenanceCompliance";
import SecurityIncidents from "./components/SecurityIncidents";
import AssetHealthStatus from "./components/AssetHealthStatus";

export interface IWidgetProps {
	uxpContext?: IContextProvider;
	instanceId?: string;
	designer?: IWDDesignModeProps;
	uiProps?: any;
}

/**
 * Register as a Widget
 */
registerWidget({
	id: "FilterComponent",
	widget: FilterComponent,
	configs: {
		layout: {
			// w: 12,
			// h: 12,
			// minH: 12,
			// minW: 12
		},
	},
});
registerWidget({
	id: "OccupancyWidget",
	widget: OccupancyWidget,
	configs: {
		layout: {
			// w: 12,
			// h: 12,
			// minH: 12,
			// minW: 12
		},
	},
});
registerWidget({
	id: "EnergyEfficiency",
	widget: EnergyEfficiency,
	configs: {
		layout: {
			// w: 12,
			// h: 12,
			// minH: 12,
			// minW: 12
		},
	},
});
registerWidget({
	id: "MaintenanceCompliance",
	widget: MaintenanceCompliance,
	configs: {
		layout: {
			// w: 12,
			// h: 12,
			// minH: 12,
			// minW: 12
		},
	},
});
registerWidget({
	id: "SecurityIncidents",
	widget: SecurityIncidents,
	configs: {
		layout: {
			// w: 12,
			// h: 12,
			// minH: 12,
			// minW: 12
		},
	},
});
registerWidget({
	id: "AssetHealthStatus",
	widget: AssetHealthStatus,
	configs: {
		layout: {
			// w: 12,
			// h: 12,
			// minH: 12,
			// minW: 12
		},
	},
});
registerWidget({
	id: "TenantSentiments",
	widget: TenantSentimentWidget,
	configs: {
		layout: {
			// w: 12,
			// h: 12,
			// minH: 12,
			// minW: 12
		},
	},
});

// registerWidget({
// 	id: "AssetCategoryCount",
// 	widget: AssetCategoryCountWidget,
// 	configs: {
// 		layout: {
// 			// w: 12,
// 			// h: 12,
// 			// minH: 12,
// 			// minW: 12
// 		},
// 	},
// });
// registerWidget({
// 	id: "RealtimeSensorData",
// 	widget: RealtimeSensorData,
// 	configs: {
// 		layout: {
// 			// w: 12,
// 			// h: 12,
// 			// minH: 12,
// 			// minW: 12
// 		},
// 	},
// });
// registerWidget({
// 	id: "RealtimeSensorInsights",
// 	widget: RealtimeSensorInsights,
// 	configs: {
// 		layout: {
// 			// w: 12,
// 			// h: 12,
// 			// minH: 12,
// 			// minW: 12
// 		},
// 	},
// });
// registerWidget({
// 	id: "BuildingHealthScore",
// 	widget: BuildingHealthScore,
// 	configs: {
// 		layout: {
// 			// w: 12,
// 			// h: 12,
// 			// minH: 12,
// 			// minW: 12
// 		},
// 	},
// });

/**
 * Register as a Sidebar Link
 */
/*
registerLink({
    id: "BuildingOverviewWidgets",
    label: "BuildingOverviewWidgets",
    // click: () => alert("Hello"),
    component: BuildingOverviewWidgetsWidget
});
*/

/**
 * Register as a UI
 */

/*
registerUI({
   id:"BuildingOverviewWidgets",
   component: BuildingOverviewWidgetsWidget
});
*/

/**
 * Register as a Widget template
 * This will enable this widget to be edited through the designer
 */

/**
registerCustomWidgetTemplate({
    id: "BuildingOverviewWidgets", // use all lowercase letters
    name: 'BuildingOverviewWidgets',
    description: 'Tempalte Description',
    template: BuildingOverviewWidgetsWidget,
    moduleId: BundleConfig.id,
    complexity: 'advanced',
    icon: ['fas', 'list'],
    expectedSchema: 'dictionary-array'
});
*/

/**
 * Enable localization
 *
 * This will enable the localization
 *
 * you can use uxpContext.$L() function
 *
 * Ex: Assume you  have a localization message in localization json
 *
 * ```
 * // localization.json
 *
 * {
 *      "uxp.my-widget.title": {
 *          "en": "This is my widget" // english translation,
 *          "ar": "<arabic tranlation >",
 *          ... here goes other translations
 *      }
 * }
 *
 * ```
 *
 *
 * thne in your widget
 *
 * ```
 * // your widget
 *
 * return <WidgetWrapper>
 *      <div class='title'>
 *          {props.uxpContext.$L('uxp.my-widget.title')}
 *      </div>
 *  </WidgetWrapper>
 *
 * ```
 *
 * /// you can have parameters as well
 * // we use `$` mark to identify params
 * // Ex: $name, $location
 *
 * ```
 * // localization.json
 *
 * {
 *      ...
 *      "uxp.my-widget.user-welcom-msg":{
 *          "en": "$userName welcome to my widget"
 *      }
 * }
 * ```
 *
 * in widget
 *
 * ```
 *      ...
 *      <div> {props.uxpContext.$L('uxp.my-widget.user-welcom-msg', {userName: "Jane Doe"})} </div>
 * ```
 *
 *
 */

// enableLocalization()
