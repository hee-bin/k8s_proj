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
                    sh 'docker build -t $DOCKERHUB_USER/db:$IMAGE_TAG ./db'
                    sh 'docker push $DOCKERHUB_USER/db:$IMAGE_TAG'
                    // was 이미지 빌드 및 푸시
                    sh 'docker build -t $DOCKERHUB_USER/was:$IMAGE_TAG ./was'
                    sh 'docker push $DOCKERHUB_USER/was:$IMAGE_TAG'
                    // web 이미지 빌드 및 푸시
                    sh 'docker build -t $DOCKERHUB_USER/web:$IMAGE_TAG ./web'
                    sh 'docker push $DOCKERHUB_USER/web:$IMAGE_TAG'
                }
            }
        }
    }

    post {
        always {
            // 항상 실행되는 작업, 예를 들어 클린업
            echo '이 작업은 실행 결과에 상관없이 항상 실행됩니다.'
        }
        success {
            // 빌드 성공 시 실행되는 작업
            echo '이 작업은 빌드가 성공하면 실행됩니다.'
        }
        failure {
            // 빌드 실패 시 실행되는 작업
            echo '이 작업은 빌드가 실패하면 실행됩니다.'
        }
    }
}
