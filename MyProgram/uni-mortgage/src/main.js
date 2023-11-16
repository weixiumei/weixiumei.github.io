import {
	createSSRApp
} from "vue";
import App from "./App.vue";
export function createApp() {
	const app = createSSRApp(App);
	return {
		app,
	};
}

// {
// 	"pages": [
// 		{
// 			"path": "pages/index",
// 			"style": {
// 				"navigationBarTitleText": "房贷计算器",
//         "backgroundColor": "#F8F8F8"
// 			}
// 		},
//     {
// 			"path": "pages/cal_mortgage",
// 			"style": {
// 				"navigationBarTitleText": "房贷计算"
// 			}
// 		}
// 	],
// 	"globalStyle": {
// 		"navigationBarTextStyle": "#fff",
// 		"navigationBarTitleText": "房贷计算器",
// 		"navigationBarBackgroundColor": "#171717",
// 		"backgroundColor": "#F8F8F8"
// 	}
// }
