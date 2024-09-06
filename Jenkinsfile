pipeline {
    agent any
    stages {
        stage('Clone Repository') {
            steps {
                git branch: 'prod',url: 'https://github.com/vinod-kumar-dev/ReactApp.git' // Replace with your repository URL
            }
        }
        stage('Build Docker Image') {
            steps {
                script {
                    // Build the Docker image locally
                    sh 'docker build -t localapp:latest .' 
                }
            }
        }
        stage('Deploy to Render') {
            steps {
                script {
                    // Trigger Render deployment using its API
                    sh '''
                    curl -X POST https://api.render.com/deploy/srv-crd6cvrtq21c73cu6ed0?key=7s0UV0cj4Gg
                    '''
                }
            }
        }
    }
}
