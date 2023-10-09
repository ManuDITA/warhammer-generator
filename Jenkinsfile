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
            steps {
                script {
                    def scannerHome = tool name: 'SonarScanner', type: 'hudson.plugins.sonar.SonarRunnerInstallation'
                    def sonarQubeIpAddress = sh(script: 'docker inspect -f \'{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}\' sonarqube', returnStdout: true).trim()
                    echo "SonarQube IP address: ${sonarQubeIpAddress}"
                    def sonarQubeUrl = "http://${sonarQubeIpAddress}:9000" // Assuming SonarQube is running on port 9000
                    
                    withSonarQubeEnv('SonarQube Scanner') {
                        sh "${scannerHome}/bin/sonar-scanner -Dsonar.host.url=${sonarQubeUrl}"
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
