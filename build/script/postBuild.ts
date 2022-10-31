/*
 * @Author: zq
 * @Date: 2022-10-26 10:58:47
 * @Last Modified by: zq
 * @Last Modified time: 2022-10-29 16:26:11
 * @desc: 项目信息文件打包命令执行文件
 */

import { runBuildConfig } from './buildConfig';
import colors from 'picocolors';

import pkg from '../../package.json';

export async function runBuildFile() {
  try {
    const argvList = process.argv.splice(2);

    // Generate configuration file
    if (!argvList.includes('disabled-config')) {
      runBuildConfig();
    }

    console.log(`✨ ${colors.cyan(`[${pkg.name}]`)}` + ' - build successfully!');
  } catch (error) {
    console.log(colors.red('vite build error:\n' + error));
    process.exit(1);
  }
}

runBuildFile();
