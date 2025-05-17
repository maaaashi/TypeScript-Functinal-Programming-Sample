FROM docker.elastic.co/elasticsearch/elasticsearch:8.13.2

# 開発用：パスワードなし
ENV discovery.type=single-node
ENV xpack.security.enabled=false

COPY init.sh /usr/share/elasticsearch/init.sh
COPY data.json /usr/share/elasticsearch/data.json
RUN chmod +x /usr/share/elasticsearch/init.sh

# elasticsearch 起動後に初期化スクリプトを実行
CMD ["/bin/bash", "-c", "/usr/local/bin/docker-entrypoint.sh & sleep 10 && /usr/share/elasticsearch/init.sh && wait"]
