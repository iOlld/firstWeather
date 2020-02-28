Чтобы собрать и запустить проект:

В командной строке, находясь в папке с проектом, нужно выполнить команду: $ npm install или $ yarn. Кому как удобней.

Затем, после установки всех пакетов:

$ gulp build — чтобы просто собрать проект. В корне проекта появится папка build, в которой будет вся вёрстка в HTML/CSS/JS формате.
$ gulp dev — чтобы собрать проект и запустить его на локальном сервере. После запуска в браузере должна автоматически открыться страница с собранным проектом (обычно это http://localhost:3000).
Установка плагинов

npm init

npm install gulp --save-dev

npm i del --save-dev

npm i gulp-autoprefixer --save-dev

npm install browser-sync gulp --save-dev

npm i gulp-sass --save-dev

npm i gulp-pug --save-dev

npm i gulp-concat --save-dev

npm i gulp-rename --save-dev

npm i gulp-imagemin --save-dev

npm i gulp-plumber --save-dev