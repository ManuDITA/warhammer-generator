pipeline {
    agent any

    triggers {
        pollSCM '*/1 * * * *'
    }

    stages {
        stage('Build') {
            steps {
                echo 'Build'
                echo "Wewe"
                echo "Build id of this job is: ${BUILD_ID}" 
                echo "Build url of this job is: ${BUILD_URL}" 
                sh 'npm install --force'
                sh 'npm run build --force'
            }
        }
        stage('SonarQube Analysis') {
            steps{
                script {
                    def scannerHome = tool name: 'SonarScanner', type: 'hudson.plugins.sonar.SonarRunnerInstallation';
                    withSonarQubeEnv('SonarScanner') {
                        sh "${scannerHome}/bin/sonar-scanner -Dsonar.host.url=http://172.18.0.2:9000"
                    }
                }
            }
        }
        
        stage('Deploy') {
            steps {
                echo 'Deploy'
            }
        }
    }
}
