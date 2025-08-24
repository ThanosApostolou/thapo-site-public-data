FROM apache/hadoop:3.4.0
USER root
# RUN yum update -y && yum install -y which && yum clean all -y && useradd -mG users hive && useradd -mG users spark
RUN useradd -mG users hive && useradd -mG users spark
USER hadoop
RUN mkdir /opt/hadoop/apps && \
    mkdir -vp /tmp/hadoop-hadoop/dfs && \
    chown -R hadoop:users /tmp/hadoop-hadoop/dfs
RUN wget --no-check-certificate https://dlcdn.apache.org/spark/spark-3.5.3/spark-3.5.3-bin-hadoop3.tgz && \
    tar zxvf spark-3.5.3-bin-hadoop3.tgz && \
    mv spark-3.5.3-bin-hadoop3 /opt/spark && \
    rm spark-3.5.3-bin-hadoop3.tgz
ENV HADOOP_HOME=/opt/hadoop
ENV SPARK_HOME=/opt/spark
ENV HIVE_HOME=/opt/hive
ENV PATH="$PATH:$SPARK_HOME/bin:$HIVE_HOME/bin"
