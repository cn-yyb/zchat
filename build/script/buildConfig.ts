/*
 * @Author: zq
 * @Date: 2022-10-26 10:56:48
 * @Last Modified by: zq
 * @Last Modified time: 2022-10-29 17:06:01
 * @desc: 项目信息文件打包配置项
 */
import { GLOB_CONFIG_FILE_NAME, OUTPUT_DIR } from '../contants';
import fs, { writeFileSync } from 'fs-extra';
import colors from 'picocolors';

import { getEnvConfig, getRootPath, getConfigFileName } from '../utils';

import pkg from '../../package.json';

interface CreateConfigParams {
  configName: string;
  config: any;
  configFileName?: string;
}

function createConfig(params: CreateConfigParams) {
  const { configName, config, configFileName } = params;
  try {
    const windowConf = `window.${configName}`;
    // Ensure that the variable will not be modified
    const configStr = `${windowConf}=${JSON.stringify(config)};
      Object.freeze(${windowConf});
      Object.defineProperty(window, "${configName}", {
        configurable: false,
        writable: false,
      });
    `.replace(/\s/g, '');
    fs.mkdirp(getRootPath(OUTPUT_DIR));
    writeFileSync(getRootPath(`${OUTPUT_DIR}/${configFileName}`), configStr);

    console.log(colors.cyan(`✨ [${pkg.name}]`) + ` - configuration file is build successfully!`);
    console.log(colors.gray(OUTPUT_DIR + '/' + colors.green(configFileName)) + '\n');
  } catch (error) {
    console.log(colors.red('configuration file failed to package:\n' + error));
  }
}

export function runBuildConfig() {
  const config = getEnvConfig();
  const configFileName = getConfigFileName(config);
  createConfig({ config, configName: configFileName, configFileName: GLOB_CONFIG_FILE_NAME });
}
