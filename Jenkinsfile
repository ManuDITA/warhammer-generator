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
                def scannerHome = tool 'SonarScanner';
                withSonarQubeEnv() {
                    sh "${scannerHome}/bin/sonar-scanner"
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
