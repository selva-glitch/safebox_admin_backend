#!/usr/bin/env groovy
def DOCKER_REGISTRY = '991612807773.dkr.ecr.ap-south-1.amazonaws.com'
def projectName = "hamara-web-api".toLowerCase()
def MajorVersion = '1'
def scmRes
def TAG
def revision
def ecrName
def envName
def appImage
def allowedNotificationEnvs = ['dev', 'prod']
node ("quess") {

    properties([
            parameters([
                choice(name: 'env', description: 'Environment to create Image', choices: allowedNotificationEnvs)
            ])
        ])

    stage('Checkout') {
        deleteDir()
        scmRes = checkout scm
        ID = UUID.randomUUID().toString()[-12..-1]
        APP_TAG = "app_${MajorVersion}.${currentBuild.id}-${ID}"
        revision = "${currentBuild.id}"
        ecrName = projectName + '-' + params.env
        envName = params.env
    }

    stage('RemoveGitDirectory') {
        sh "echo '${scmRes.GIT_COMMIT}' > .revision"
        sh 'rm -fr .git'
    }

    stage('StoragePermission') {
        sh 'chmod 777 -R storage'
    }

    stage('Fetch .env from AWS Secrets Manager') {
        sh """
            # Get the .env content as-is from Secrets Manager
            aws secretsmanager get-secret-value \
              --secret-id "hamara_web_api_${envName}" \
              --region "ap-south-1" \
              --query SecretString \
              --output text > .env
            """
    }

    stage('Build') {
        appImage = docker.build("${DOCKER_REGISTRY}/${ecrName}:${APP_TAG}", '--no-cache -f Dockerfile .')
    }

    stage ('Docker :: Push') {
        sh " echo 'Image push the repo ${ecrName}'"
        sh("eval \$(aws ecr get-login --no-include-email --region ap-south-1)")
        docker.withRegistry("https://${DOCKER_REGISTRY}/${ecrName}") {
          appImage.push('latest')
        }
    }

    stage('Docker :: Remove Image') {
        sh "docker rmi -f ${DOCKER_REGISTRY}/${ecrName}:${APP_TAG}"
     }

}


