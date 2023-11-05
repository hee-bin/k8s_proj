pipeline {
    agent any

    environment {
        // 환경 변수 설정
        DOCKERHUB_CREDENTIALS_ID = 'heebinDockerhub'
        DOCKERHUB_USERNAME = 'heebin00'
        IMAGE_TAG = 'latest' // 또는 다른 태깅 전략을 사용할 수 있습니다.
    }

    stages {
        stage('Checkout') {
            steps {
                // GitHub 저장소에서 소스 코드 체크아웃
                git 'https://github.com/hee-bin/k8s_proj.git'
            }
        }

        stage('Build & Push Docker Images') {
            steps {
                script {
                    // Docker Hub에 로그인
                    withCredentials([usernamePassword(credentialsId: "${env.DOCKERHUB_CREDENTIALS_ID}", usernameVariable: 'DOCKERHUB_USER', passwordVariable: 'DOCKERHUB_PASS')]) {
                        sh 'echo $DOCKERHUB_PASS | docker login -u $DOCKERHUB_USER --password-stdin'
                    }
                    // db 이미지 빌드 및 푸시
                    sh '''
                    docker build -t $DOCKERHUB_USER/db:$IMAGE_TAG ./db
                    docker push $DOCKERHUB_USER/db:$IMAGE_TAG
                    '''
                    // was 이미지 빌드 및 푸시
                    sh '''
                    docker build -t $DOCKERHUB_USER/was:$IMAGE_TAG ./was
                    docker push $DOCKERHUB_USER/was:$IMAGE_TAG
                    '''
                    // web 이미지 빌드 및 푸시
                    sh '''
                    docker build -t $DOCKERHUB_USER/web:$IMAGE_TAG ./web
                    docker push $DOCKERHUB_USER/web:$IMAGE_TAG
                    '''
                }
            }
        }

        // Helm을 사용하여 쿠버네티스에 배포하는 스테이지를 추가할 수 있습니다.
        // ...

    }

    post {
        // 빌드 후 작업, 예를 들어 클린업, 알림 등
        always {
            // 항상 실행되는 작업
        }
        success {
            // 빌드 성공 시 실행되는 작업
        }
        failure {
            // 빌드 실패 시 실행되는 작업
        }
    }
}
