FROM apache/hive:4.0.0
USER root
# RUN yum update -y && yum install -y which && yum clean all -y && useradd -mG users hive && useradd -mG users spark
RUN useradd -mG users hadoop && useradd -mG users spark
# RUN mkdir /opt/hadoop/apps && \
#     mkdir -vp /tmp/hadoop-hadoop/dfs && \
#     chown -R hadoop:users /tmp/hadoop-hadoop/dfs && \
RUN mkhomedir_helper hive && \
    apt-get update && apt-get install -y wget && apt-get clean
# RUN wget --no-check-certificate https://dlcdn.apache.org/hive/hive-4.0.1/apache-hive-4.0.1-bin.tar.gz && \
#     tar zxvf apache-hive-4.0.1-bin.tar.gz && \
#     mv apache-hive-4.0.1-bin /opt/hive && \
#     rm apache-hive-4.0.1-bin.tar.gz
# ENV HADOOP_HOME=/opt/hadoop
# ENV SPARK_HOME=/opt/spark
# ENV HIVE_HOME=/opt/hive
# ENV PATH="$PATH:$SPARK_HOME/bin"
USER hive
