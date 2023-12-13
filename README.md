# Плагин для ручного ввода в Grafana

### Установка плагина в Grafana

- Открыть терминал
- Перейти в директорию, куда будет скачан проект с помощью команды `cd <путь к директории>`
- Загрузить проект с помощью команды `git clone https://github.com/mp-co-ru/grafana-ui-plugin.git`
- Из терминала зайти в корневую директорию проекта с помощью команды `cd grafana-ui-plugin`
- Далее выполнить команду yarn build
- Удостовериться, что была создана новая папка `dist` внутри корневого каталога проекта.
- Создать архив из папки `dist` в котором будут находится файлы для плагина `zip -r mp-co-peresvet-app-1-0-0.zip dist`.
- Создать директорию для плагина в файлах Grafana по пути `mkdir /var/lib/grafana/plugins/mpco-mpcoform-panel`.
- Перенести созданный архив в созданную директорию и разархивировать его `mv mp-co-peresvet-app-1-0-0.zip /var/lib/grafana/plugins/mpco-mpcoform-panel && unzip /var/lib/grafana/plugins/mpco-mpcoform-panel/mp-co-peresvet-app-1-0-0.zip`

### Запуск приложения в режиме отладки

- Убедиться, что на компьютере стоит Docker.
- Открыть терминал
- Перейти в директорию, куда будет скачан проект с помощью команды `cd <путь к директории>`
- Загрузить проект с помощью команды `git clone https://github.com/mp-co-ru/grafana-ui-plugin.git`
- Из терминала зайти в корневую директорию проекта с помощью команды `cd grafana-ui-plugin`
- Выполнить команду docker compose -f docker-compose.yaml up
- Далее выполнить команду yarn dev

После этого перейти в Grafana по адресу http://localhost:3000. Плагин будет доступен.
