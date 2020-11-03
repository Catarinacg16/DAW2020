<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns:xs="http://www.w3.org/2001/XMLSchema"
    exclude-result-prefixes="xs"
    version="2.0">
    
    <xsl:template match="/">
        <xsl:result-document href="site/index.html">
            <html>
                <head>
                    <title>Arqueossítios do NW português</title>
                </head>
                <body>
                    <h2>Arqueossítios do NW português</h2>
                    <h3>Índice de Arqueossítios</h3>
                    <ol>
                        <xsl:apply-templates select="//ARQELEM" mode="indice">
                            <xsl:sort select="IDENTI"/>
                        </xsl:apply-templates>
                    </ol>
                </body>
            </html>
        </xsl:result-document>
        <xsl:apply-templates/>
    </xsl:template>
    
    
    <!-- Templates de índice ................................... -->
    
    <xsl:template match="ARQELEM" mode="indice">
        <li>
            <a name="i{generate-id()}"/>
            <a href="{generate-id()}.html">
                <xsl:value-of select="IDENTI"/>
            </a>  
        </li>
    </xsl:template>
    
    <!-- Templates para o conteúdo............................... -->
    
    <xsl:template match="ARQELEM">
        <xsl:result-document href="site/{generate-id()}.html">
            <html>
                <head>
                    <title><xsl:value-of select="IDENTI"/></title>
                </head>
                <body>
                    <p><b>Identificação:</b> <xsl:value-of select="IDENTI"/></p>
                    <xsl:if test = "IMAGEM"> 
                        <p><b>Imagem:</b><xsl:value-of select="IMAGEM"/></p>
                    </xsl:if>
                    <p><b>Descrição:</b> <xsl:value-of select="DESCRI"/></p>
                    <xsl:if test = "CRONO"> 
                        <p><b>Cronologia:</b><xsl:value-of select="CRONO"/></p>
                    </xsl:if>
                    <p><b>Lugar:</b> <xsl:value-of select="LUGAR"/></p>
                    <p><b>Freguesia:</b> <xsl:value-of select="FREGUE"/></p>
                    <xsl:if test = "CODADM"> 
                        <p><b>Codadm:</b><xsl:value-of select="CODADM"/></p>
                    </xsl:if>
                    <p><b>Concelho:</b> <xsl:value-of select="CONCEL"/></p>
                    <xsl:if test = "CODADM"> 
                        <p><b>Codadm:</b><xsl:value-of select="CODADM"/></p>
                    </xsl:if>
                    <xsl:if test = "LATITU|LONGIT"> 
                        <p><b>Latitude:</b><xsl:value-of select="LATITU"/>
                            <b>Longitude:</b><xsl:value-of select="LONGIT"/></p>
                    </xsl:if>
                    <xsl:if test = "ALTITU"> 
                        <p><b>Altitude:</b><xsl:value-of select="ALTITU"/></p>
                    </xsl:if>
                    <xsl:if test = "ACESSO"> 
                        <p><b>Acesso:</b><xsl:value-of select="ACESSO"/></p>
                    </xsl:if>
                    <xsl:if test = "QUADRO"> 
                        <p><b>Quadro:</b><xsl:value-of select="QUADRO"/></p>
                    </xsl:if>
                    <xsl:if test = "BIBLIO"> 
                        <p><b>Bibliografia:</b></p>
                    <xsl:for-each select="BIBLIO">
                        <p><xsl:value-of select="."/></p>
                    </xsl:for-each>
                    </xsl:if>
                    <xsl:if test = "AUTOR"> 
                        <p><b>Autor:</b><xsl:value-of select="AUTOR"/></p>
                    </xsl:if>
                    <p><b>Data:</b> <xsl:value-of select="DATA"/></p>
                    <address>
                        [<a href="index.html#i{generate-id()}">Voltar à Home</a>]
                    </address>
                </body>
            </html>
        </xsl:result-document>
    </xsl:template>
    
</xsl:stylesheet>