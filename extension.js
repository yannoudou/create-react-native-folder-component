// // The module 'vscode' contains the VS Code extensibility API
// // Import the module and reference it with the alias vscode in your code below
// const vscode = require('vscode');

// // this method is called when your extension is activated
// // your extension is activated the very first time the command is executed

// /**
//  * @param {vscode.ExtensionContext} context
//  */
// function activate(context) {

// 	// Use the console to output diagnostic information (console.log) and errors (console.error)
// 	// This line of code will only be executed once when your extension is activated
// 	console.log('Congratulations, your extension "create-react-native-folder-component" is now active!');

// 	// The command has been defined in the package.json file
// 	// Now provide the implementation of the command with  registerCommand
// 	// The commandId parameter must match the command field in package.json
// 	let disposable = vscode.commands.registerCommand('extension.helloWorld', function () {
// 		// The code you place here will be executed every time your command is executed

// 		// Display a message box to the user
// 		vscode.window.showInformationMessage('Hello World!');
// 	});

// 	context.subscriptions.push(disposable);
// }
// exports.activate = activate;

// // this method is called when your extension is deactivated
// function deactivate() {}

// module.exports = {
// 	activate,
// 	deactivate
// }




// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below 

const vscode = require('vscode');

var fs = require('fs');
var path = require('path');
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed




function activate(context) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "first-test" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json

	var disposable = vscode.commands.registerCommand('extension.createReactNativeFolderComponent', function (context) {
		vscode.window.showInputBox().then((name) => {
			if (typeof name === "undefined") {
				return vscode.window.showErrorMessage("Create Component Failed");
			}
			let pure = true;
			vscode.window.showQuickPick(["PureComponent", "Component"], { placeHolder: "Pure component ou Component" }).then((needCss) => {
				// createComponent(name, needCss !== "PureComponent", context.fsPath, true);
				if (needCss === 'Component') {
					pure = false;
				}
				vscode.window.showQuickPick(["Oui", "Non"], { placeHolder: "Voulez vous un source folder (/SRC)" }).then((needCss) => {
					createComponent(name, pure, (needCss === 'Oui') ? true : false, context.fsPath);
				});

			});


		});
	});


	var disposable = vscode.commands.registerCommand('extension.createReactNativeFolderComponentFast', function (context) {
		vscode.window.showInputBox().then((name) => {
			if (typeof name === "undefined") {
				return vscode.window.showErrorMessage("Create Component Failed");
			}
			createComponent(name, true, true, context.fsPath);

		});
	});


	context.subscriptions.push(disposable);
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {
}
exports.deactivate = deactivate;


function createFolder(_path) {
	console.log("path: ", _path);
	return new Promise((resolve, reject) => {
		fs.mkdir(_path, {}, function (err, fd) {
			// handle error
			if (err) {
				return reject("File allrady exists");
			}
			return resolve(fd);
		});
	});
}

function createFile(_path) {
	console.log("path: ", _path);
	return new Promise((resolve, reject) => {
		fs.open(_path, "wx", function (err, fd) {
			// handle error
			if (err) {
				return reject("File allrady exists");
			}
			return resolve(fd);
		});
	});
}

function writeFile(file, data) {
	return new Promise((resolve, reject) => {
		fs.write(file, data, function (err, fd) {
			// handle error
			if (err) {
				return reject("File allrady exists");
			}
			return resolve(fd);
		});
	});
}


// function componnentString(name, needCss) {
//     return `import React from 'react';
// ${needCss ? `import './${name}.css';` : ""}
// class ${name} extends React.Component {
//     constructor(props) {
//         super(props);
//     }
//     render() {
//         return (
//             <div ${needCss ? `className='${name.toLowerCase()}_wrapper'` : ""}>
//             </div>
//         );
//     }
// }
// export default ${name};`

// }



function componnentStringindex_js(name, number, pure) {
	let toWrite = null
	if (number === 1) {
		let vad = "export { default } from './" + name + "Logic';";
		toWrite = vad;
	}

	if (number === 2) {
		let ad = "import { PureComponent } from 'react';" + "\n" +
			"import { StyleProp, TextStyle,ViewStyle } from 'react-native';" +
			"\n" +
			"\n" +
			"interface " + name + "Props {" +
			"\n" +
			"    // different types" + "\n" +
			"    // linkify?: object; linkStyle?: StyleProp<TextStyle>; " + "\n" +
			"    // containerStyle?: StyleProp<ViewStyle>;  onPress?: (url: string, text: string) => void;" +
			"\n" + "\n" +
			"}" +
			"\n" +
			"\n" +
			"\n" +
			"\n" +
			"declare class " + name + " extends PureComponent<" + name + "Props> {" +
			"\n" +
			"\n" +
			"}" +
			"\n" +
			"\n" +
			"\n" +
			"export default " + name + ";"
		toWrite = ad;
	}


	if (number === 3) {
		// if (pure) {
		let add = (pure) ? "PureComponent" : "Component";
		var val = "import React, { " + add + " } from 'react';" + "\n" +
			"import { Text, View, TouchableOpacity } from 'react-native';" + "\n" + "\n" + "\n" + "\n" + "\n" + "\n" +
			"import EStyleSheet from 'react-native-extended-stylesheet';" + "\n" +
			"import FeatherIcon from 'react-native-vector-icons/Feather';" + "\n" + "\n" + "\n" +
			"\n" +
			"export default class " + name + 'Container' + " extends " + add + "  {" + "\n" +
			"    constructor(props) {" + "\n" +
			"        super(props)" + "\n" +
			"\n" +
			"        this.state = {" +
			"\n" + "\n" +
			"        };" +
			"\n" + "\n" +
			"        // this.funct=this.funct.bind(this);" + "\n" +
			"\n" +
			"    }" +
			"\n" +
			"\n" +
			"\n" +
			"    render() {" + "\n" +
			"        return (" + "\n" +
			"            <View style={styles.containerStyle} >" + "\n" +
			"                <Text> textInComponent </Text>" + "\n" +
			"            </View>" + "\n" +
			"        )" + "\n" +
			"    }" + "\n" +
			"}" + "\n" +
			"\n" +
			"\n" +
			"\n" +
			"const styles = EStyleSheet.create({" + "\n" +
			"    containerStyle:{" + "\n" +
			"\n" +
			"    }," + "\n" +
			"    toptext: {  fontFamily: 'c-black', fontSize: '0.95rem',  }," +
			"\n" +
			"})" + "\n" +
			"\n";


		toWrite = val;

	}

	if (number === 4) {
		let add = (pure) ? "PureComponent" : "Component";

		let _vad = "import React, { " + add + " } from 'react';" + "\n" +
			"import TextContainer from './TextContainer';" + "\n" +
			"// import withObservables from '@nozbe/with-observables'" + "\n" + "\n" + "\n" +
			"export default class " + name + " extends " + add + "  {" + "\n" +
			"render() {" + "\n" +
			"return <TextContainer {...this.props} />" + "\n" +
			"}" + "\n" +
			"}" + "\n" + "\n" + "\n" + "\n" +
			"// const enhance = withObservables(['search'], ({ database, search }) => ({" + "\n" +
			"//     blogs: database.collections " + "\n" +
			"//      .get('blogs')" + "\n" +
			"//       .query(Q.where('name', Q.like(`%${Q.sanitizeLikeString(search)}%`)))," + "\n" +
			"//       post: post.observe()," + "\n" +
			"//       comments: post.comments.observe()," + "\n" +
			"//   }))" + "\n" + "\n" +
			"//   export default enhance(" + name + ")";

		toWrite = _vad;

	}

	return toWrite;

}


// function componnentString_Stateless(name, needCss) {
// 	return `import React from 'react';
// ${needCss ? `import './${name}.css';` : ""}
// const ${name} = () => {
//     return (
//         <div ${needCss ? `className='${name.toLowerCase()}_wrapper'` : ""}>
//         </div>
//     );
// }
// export default ${name};`

// }

// function cssString(name) {
// 	return `.${name.toLowerCase()}_wrapper{\n\n}`
// }









function createComponent(name, pure, withSrc, _path) {
	const dir_path = _path;
	const component_name = name;
	// const file_name_react = path.join(dir_path, component_name, component_name + ".react.js");
	// const file_name_css = path.join(dir_path, component_name, component_name + ".css");


	const file_name_index_js = path.join(dir_path, component_name, "index.js");
	const file_name_index_ts = path.join(dir_path, component_name, "index.d.ts");
	const file_name_src = path.join(dir_path, component_name, 'src');
	const file_name_component = path.join(dir_path, component_name, component_name + "Container.js");
	const file_name_component_2 = path.join(dir_path, component_name, component_name + "Logic.js");



	fs.mkdirSync(path.join(dir_path, component_name));



	const file_Promise_Component = createFile(file_name_index_js);
	file_Promise_Component.then((file) => {
		const write_Promise_Component = writeFile(file, componnentStringindex_js(component_name, 1));

		write_Promise_Component.then(() => {
			fs.close(file, function (err) {
				if (err) {
					console.log(err);
				}
			});
		}).catch((err) => {
			console.log(err);
			vscode.window.showInformationMessage('Error');
		});

	}).catch((err) => {
		console.log(err);
		vscode.window.showInformationMessage('Error');
	});


	const _file_Promise_Component = createFile(file_name_index_ts);
	_file_Promise_Component.then((file) => {
		const write_Promise_Component = writeFile(file, componnentStringindex_js(component_name, 2));

		write_Promise_Component.then(() => {
			fs.close(file, function (err) {
				if (err) {
					console.log(err);
				}
			});
		}).catch((err) => {
			console.log(err);
			vscode.window.showInformationMessage('Error');
		});

	}).catch((err) => {
		console.log(err);
		vscode.window.showInformationMessage('Error');
	});

	const _file___Promise_Component_ = createFile(file_name_component_2);
	_file___Promise_Component_.then((file) => {
		const write_Promise_Component = writeFile(file, componnentStringindex_js(component_name, 4, pure));

		write_Promise_Component.then(() => {
			fs.close(file, function (err) {
				if (err) {
					console.log(err);
				}
			});
		}).catch((err) => {
			console.log(err);
			vscode.window.showInformationMessage('Error');
		});

	}).catch((err) => {
		console.log(err);
		vscode.window.showInformationMessage('Error');
	});


	const _file_Promise_Component_ = createFile(file_name_component);
	_file_Promise_Component_.then((file) => {
		const write_Promise_Component = writeFile(file, componnentStringindex_js(component_name, 3, pure));

		write_Promise_Component.then(() => {
			fs.close(file, function (err) {
				if (err) {
					console.log(err);
				}
			});
		}).catch((err) => {
			console.log(err);
			vscode.window.showInformationMessage('Error');
		});

	}).catch((err) => {
		console.log(err);
		vscode.window.showInformationMessage('Error');
	});


	if (withSrc) {

		createFolder(file_name_src);
		// _file_Promise_Compone.then((file) => {
		// 	const write_Promise_Component = writeFile(file, componnentStringindex_js(component_name, 3,pure));

		// 	write_Promise_Component.then(() => {
		// 		fs.close(file, function (err) {
		// 			if (err) {
		// 				console.log(err);
		// 			}
		// 		});
		// 	}).catch((err) => {
		// 		console.log(err);
		// 		vscode.window.showInformationMessage('Error');
		// 	});

		// }).catch((err) => {
		// 	console.log(err);
		// 	vscode.window.showInformationMessage('Error');
		// });
	}


}