// eslint-disable-next-line @typescript-eslint/no-require-imports
const fs = require('fs');
// eslint-disable-next-line @typescript-eslint/no-require-imports
const path = require('path');

// 현재 스크립트 파일의 디렉토리를 기준으로 경로 설정
const currentDir = __dirname;
const appDirectory = path.join(currentDir, 'app');
const constantFilePath = path.join(currentDir, 'constant', 'pathname.ts');

// 경로를 상수 이름으로 변환하는 함수
function pathToConstantName(filePath) {
  return (
    path
      .relative(appDirectory, filePath)
      .replace(/\/page\.tsx$/, '')
      .replace(/\[.*?\]/g, '') // 다이나믹 부분 제거
      .toUpperCase()
      .replace(/\//g, '_')
      .replace(/-/g, '_') + '_PATHNAME'
  );
}

// 상수 값 생성
function createConstantValue(filePath) {
  return (
    '/' +
    path
      .relative(appDirectory, filePath)
      .replace(/\/page\.tsx$/, '')
      .replace(/\[.*?\]/g, '') // 다이나믹 부분 제거
  );
}

// 디렉토리를 재귀적으로 탐색하는 함수
function traverseDirectory(dir, fileList = []) {
  const files = fs.readdirSync(dir);

  files.forEach((file) => {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      traverseDirectory(filePath, fileList);
    } else if (
      file === 'page.tsx' &&
      // app/page.tsx 제외
      filePath !== path.join(appDirectory, 'page.tsx')
    ) {
      fileList.push(filePath);
    }
  });

  return fileList;
}

// 모든 page.tsx 파일 찾기
const pageFiles = traverseDirectory(appDirectory);

// 새로운 상수들을 저장할 배열
const newConstants = [];
newConstants.push('export const HOME_PATHNAME = "/";');

// 각 page.tsx 파일에 대해 상수 생성
pageFiles.forEach((filePath) => {
  const constantName = pathToConstantName(filePath);
  const constantValue = createConstantValue(filePath);
  newConstants.push(`export const ${constantName} = "${constantValue}";`);
});

// 새로운 상수들 추가
const updatedContent = `${newConstants.join('\n')}\n`;

// 디렉토리가 없을 경우 생성하는 함수
function ensureDirectoryExistence(filePath) {
  const dirname = path.dirname(filePath);
  if (fs.existsSync(dirname)) {
    return true;
  }
  ensureDirectoryExistence(dirname);
  fs.mkdirSync(dirname);
}

ensureDirectoryExistence(constantFilePath);

fs.writeFileSync(constantFilePath, updatedContent);

console.log(`${newConstants.length}개의 상수가 ${constantFilePath}에 업데이트되었습니다.`);
